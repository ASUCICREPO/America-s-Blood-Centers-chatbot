# Scheduled Data Source Sync

## Overview

The America's Blood Centers chatbot includes automated daily syncing of data sources to ensure the blood supply status information is always up-to-date.

## Schedule

- **Frequency**: Daily
- **Time**: 2:00 PM EST (7:00 PM UTC during standard time, 6:00 PM UTC during daylight saving time)
- **Target**: All Q Business data sources, with special focus on:
  - `https://americasblood.org/for-donors/americas-blood-supply/` (Blood Supply Status)

## How It Works

1. **EventBridge Rule**: Triggers daily at 2 PM EST
2. **Lambda Function**: `scheduled-sync.py` executes the sync
3. **Q Business**: Crawls and indexes updated content
4. **Chatbot**: Provides users with latest blood supply information

## Architecture

```
EventBridge (Cron: 0 19 * * ? *)
    ↓
Lambda Function (scheduled-sync.py)
    ↓
Q Business Data Source Sync Jobs
    ↓
Updated Index with Latest Blood Supply Status
```

## Manual Sync

You can also trigger a manual sync using the AWS CLI:

```bash
# Get the function name from CDK outputs
FUNCTION_NAME=$(aws cloudformation describe-stacks \
  --stack-name AmericasBloodCentersStack \
  --query 'Stacks[0].Outputs[?OutputKey==`ScheduledSyncFunctionName`].OutputValue' \
  --output text)

# Invoke the function manually
aws lambda invoke \
  --function-name $FUNCTION_NAME \
  --payload '{"application_id":"YOUR_APP_ID","index_id":"YOUR_INDEX_ID"}' \
  response.json

# View the response
cat response.json
```

## Monitoring

### CloudWatch Logs

View sync logs in CloudWatch:
```bash
aws logs tail /aws/lambda/AmericasBloodCentersStack-ScheduledSyncFunction --follow
```

### Sync Status

Check the status of sync jobs:
```bash
aws qbusiness list-data-source-sync-jobs \
  --application-id YOUR_APP_ID \
  --data-source-id YOUR_DATA_SOURCE_ID \
  --index-id YOUR_INDEX_ID
```

## Configuration

### Changing the Schedule

To modify the sync schedule, update the cron expression in `americas-blood-centers-stack.ts`:

```typescript
const dailySyncRule = new events.Rule(this, "DailyDataSourceSyncRule", {
  schedule: events.Schedule.cron({
    minute: "0",
    hour: "19", // Change this for different time
    day: "*",
    month: "*",
    year: "*",
  }),
});
```

### Time Zone Notes

- EventBridge uses UTC time
- 2 PM EST = 7 PM UTC (standard time)
- 2 PM EDT = 6 PM UTC (daylight saving time)
- Current configuration uses 7 PM UTC (standard time)

## Data Sources

### Daily Sync URLs
Located in `data-sources/daily-sync-urls.txt`:
- Blood supply status page (updates daily)

### On-Demand URLs
Located in `data-sources/urls1.txt`:
- Static content (PDFs, FAQs, etc.)
- Synced during initial deployment
- Can be manually synced as needed

## Troubleshooting

### Sync Not Running

1. Check EventBridge rule is enabled:
```bash
aws events describe-rule --name AmericasBloodCentersStack-DailyDataSourceSyncRule
```

2. Check Lambda function logs:
```bash
aws logs tail /aws/lambda/FUNCTION_NAME --follow
```

### Sync Failures

Common issues:
- **Rate limiting**: Q Business has rate limits on sync jobs
- **Network issues**: Temporary connectivity problems
- **Invalid URLs**: Check data source URLs are accessible

### Manual Intervention

If automatic sync fails, you can manually trigger sync in the Q Business console:
1. Go to AWS Q Business Console
2. Select your application
3. Navigate to Data Sources
4. Click "Sync now" for each data source

## Cost Considerations

- **Lambda**: Minimal cost (runs once per day, ~5 minutes max)
- **Q Business**: Sync jobs are included in Q Business pricing
- **EventBridge**: Free tier covers daily triggers

## Best Practices

1. **Monitor sync logs** regularly to ensure successful updates
2. **Test manual sync** before relying on automated schedule
3. **Update URLs** in `daily-sync-urls.txt` as needed
4. **Review sync frequency** based on content update patterns
5. **Set up CloudWatch alarms** for sync failures

## Support

For issues or questions about scheduled syncing:
1. Check CloudWatch logs for error messages
2. Review Q Business console for sync job status
3. Verify EventBridge rule is active and configured correctly
