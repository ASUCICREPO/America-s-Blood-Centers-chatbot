"""
Scheduled Data Source Sync for America's Blood Centers
This Lambda function can be triggered by EventBridge to sync data sources daily at 2 PM EST
"""

import boto3
import json
import logging
from datetime import datetime

logger = logging.getLogger()
logger.setLevel(logging.INFO)

qbusiness_client = boto3.client('qbusiness')

def lambda_handler(event, context):
    """
    Trigger sync jobs for all data sources to get latest blood supply status
    Scheduled to run daily at 2 PM EST to capture updated blood supply information
    """
    
    try:
        application_id = event.get('application_id')
        index_id = event.get('index_id')
        
        if not application_id or not index_id:
            logger.error("Missing required parameters: application_id and index_id")
            return {
                'statusCode': 400,
                'body': json.dumps({'error': 'Missing required parameters'})
            }
        
        # List all data sources
        response = qbusiness_client.list_data_sources(
            applicationId=application_id,
            indexId=index_id
        )
        
        sync_jobs_started = []
        
        for data_source in response.get('dataSources', []):
            data_source_id = data_source['dataSourceId']
            display_name = data_source.get('displayName', 'Unknown')
            
            try:
                # Start sync job for each data source
                sync_response = qbusiness_client.start_data_source_sync_job(
                    applicationId=application_id,
                    dataSourceId=data_source_id,
                    indexId=index_id
                )
                
                sync_jobs_started.append({
                    'dataSourceId': data_source_id,
                    'displayName': display_name,
                    'executionId': sync_response.get('executionId'),
                    'status': 'started'
                })
                
                logger.info(f"Started sync job for data source: {display_name}")
                
            except Exception as e:
                logger.error(f"Failed to start sync job for {display_name}: {str(e)}")
                sync_jobs_started.append({
                    'dataSourceId': data_source_id,
                    'displayName': display_name,
                    'status': 'failed',
                    'error': str(e)
                })
        
        return {
            'statusCode': 200,
            'body': json.dumps({
                'message': f'Scheduled sync completed at {datetime.utcnow().isoformat()}',
                'syncJobsStarted': len([job for job in sync_jobs_started if job['status'] == 'started']),
                'syncJobsFailed': len([job for job in sync_jobs_started if job['status'] == 'failed']),
                'details': sync_jobs_started
            })
        }
        
    except Exception as e:
        logger.error(f"Scheduled sync failed: {str(e)}")
        return {
            'statusCode': 500,
            'body': json.dumps({
                'error': 'Scheduled sync failed',
                'details': str(e)
            })
        }