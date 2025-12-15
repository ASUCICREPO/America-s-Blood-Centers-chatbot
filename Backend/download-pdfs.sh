#!/bin/bash

# Script to download America's Blood Centers PDFs for S3 indexing
# This provides a backup method in case web crawling doesn't capture all PDFs

echo "Downloading America's Blood Centers PDFs..."

# Create data-sources directory if it doesn't exist
mkdir -p data-sources

# Array of PDF URLs and their desired filenames
declare -A pdfs=(
    ["https://americasblood.org/wp-content/uploads/2024/08/U.S.-Blood-Donation-Statistics-and-Public-Messaging-Guide-Jan.-2024-v-2.1-FINAL.pdf"]="US-Blood-Donation-Statistics-Guide-2024.pdf"
    ["https://americasblood.org/wp-content/uploads/2025/02/Americas-Blood-Centers-2025-Advocacy-Agenda.pdf"]="Americas-Blood-Centers-2025-Advocacy-Agenda.pdf"
    ["https://americasblood.org/wp-content/uploads/2025/06/Blood-Transfusions-and-Hospice-2025-Final-1.pdf"]="Blood-Transfusions-and-Hospice-2025.pdf"
    ["https://americasblood.org/wp-content/uploads/2025/05/Cutting-Red-Tape-to-Better-Support-Patients-and-the-Blood-Supply-5.30.25.pdf"]="Cutting-Red-Tape-Blood-Supply-Support.pdf"
    ["https://americasblood.org/wp-content/uploads/2025/07/Improving-Patient-Access-to-Blood-Transfusions-on-Ambulances-7.17.25.pdf"]="Improving-Patient-Access-Blood-Transfusions-Ambulances.pdf"
    ["https://americasblood.org/wp-content/uploads/2025/05/ABC-Strengthening-the-Cyber-Resilience-of-the-Blood-Community-5.28.25.pdf"]="ABC-Strengthening-Cyber-Resilience-Blood-Community.pdf"
    ["https://americasblood.org/wp-content/uploads/2025/01/The-Timeline-of-Blood-Donation-Final.pdf"]="Timeline-of-Blood-Donation.pdf"
    ["https://americasblood.org/wp-content/uploads/2025/01/Blood-101-A-Snapshot-of-Americas-Blood-Supply-and-Its-Donors-Final-Jan-2025.pdf"]="Blood-101-Snapshot-Americas-Blood-Supply-Donors.pdf"
    ["https://americasblood.org/wp-content/uploads/2024/11/Safeguarding-the-Blood-Supply-Against-Tick-and-Mosquito-Borne-Illnesses-Final.pdf"]="Safeguarding-Blood-Supply-Vector-Borne-Illnesses.pdf"
    ["https://americasblood.org/wp-content/uploads/2023/10/ABC-Frequently-Asked-Questions-about-Alpha-Gal-Syndrome-Final.pdf"]="ABC-FAQ-Alpha-Gal-Syndrome.pdf"
    ["https://americasblood.org/wp-content/uploads/2023/09/ABC-FAQ-on-FDAs-IDA-Change-Final.pdf"]="ABC-FAQ-FDA-IDA-Change.pdf"
    ["https://americasblood.org/wp-content/uploads/2023/09/ABC-Promoting-Awareness-of-New-Eligibility-Criteria-Final.pdf"]="ABC-Promoting-Awareness-New-Eligibility-Criteria.pdf"
    ["https://americasblood.org/wp-content/uploads/2025/01/Why-Donor-Diversity-Is-Critical-to-Patient-Care-Final-1.15.25.pdf"]="Why-Donor-Diversity-Critical-Patient-Care.pdf"
    ["https://americasblood.org/wp-content/uploads/2023/06/ABC-Ensuring-the-Safety-of-the-U.S.-Blood-Supply.pdf"]="ABC-Ensuring-Safety-US-Blood-Supply.pdf"
)

# Download each PDF
for url in "${!pdfs[@]}"; do
    filename="${pdfs[$url]}"
    echo "Downloading: $filename"
    
    if curl -L -o "data-sources/$filename" "$url"; then
        echo "✅ Successfully downloaded: $filename"
    else
        echo "❌ Failed to download: $filename"
    fi
    
    # Small delay to be respectful to the server
    sleep 1
done

echo ""
echo "📄 PDF Download Summary:"
echo "Total PDFs: ${#pdfs[@]}"
echo "Location: data-sources/"
echo ""
echo "These PDFs will be automatically indexed as S3 data sources during deployment."
echo "The web crawler will also index these same PDFs from the website URLs."
echo "This dual approach ensures comprehensive coverage of all content."