# PowerShell script to download placeholder images for the portfolio website

# Create images directory if it doesn't exist
$imagesDir = ".\images"
if (-not (Test-Path $imagesDir)) {
    New-Item -ItemType Directory -Path $imagesDir | Out-Null
    Write-Host "Created images directory"
}

# Define image URLs and local file paths
$imageUrls = @(
    @{
        Url = "https://source.unsplash.com/1600x900/?coding,technology"
        Path = "$imagesDir\hero-bg.jpg"
        Description = "Hero background image"
    },
    @{
        Url = "https://source.unsplash.com/400x400/?portrait,professional"
        Path = "$imagesDir\profile.jpg"
        Description = "Profile image"
    },
    @{
        Url = "https://source.unsplash.com/600x400/?ecommerce,website"
        Path = "$imagesDir\project1.jpg"
        Description = "Project 1 image (E-commerce)"
    },
    @{
        Url = "https://source.unsplash.com/600x400/?portfolio,design"
        Path = "$imagesDir\project2.jpg"
        Description = "Project 2 image (Portfolio)"
    },
    @{
        Url = "https://source.unsplash.com/600x400/?blog,writing"
        Path = "$imagesDir\project3.jpg"
        Description = "Project 3 image (Blog)"
    }
)

# Download each image
foreach ($image in $imageUrls) {
    Write-Host "Downloading $($image.Description)..."
    try {
        Invoke-WebRequest -Uri $image.Url -OutFile $image.Path
        Write-Host "  Downloaded to $($image.Path)" -ForegroundColor Green
    } catch {
        Write-Host "  Failed to download $($image.Description): $_" -ForegroundColor Red
    }
}

Write-Host "Image download complete!" -ForegroundColor Cyan
