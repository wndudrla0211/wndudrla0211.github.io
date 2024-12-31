document.addEventListener('DOMContentLoaded', function() {
    try {
        initializeImageGallery();
    } catch (error) {
        console.error('Failed to initialize image gallery:', error);
    }
});

function initializeImageGallery() {
    // 이미지 변경 함수
    window.changeImage = function(src, thumbnail) {
        try {
            const mainImage = document.getElementById('mainImage');
            if (!mainImage) throw new Error('Main image element not found');

            mainImage.src = src;
            
            document.querySelectorAll('.thumbnail').forEach(thumb => {
                thumb.classList.remove('active');
            });
            
            thumbnail.classList.add('active');
        } catch (error) {
            console.error('Error changing image:', error);
        }
    };

    // 키보드 네비게이션
    document.addEventListener('keydown', function(e) {
        try {
            const thumbnails = document.querySelectorAll('.thumbnail');
            const currentIndex = Array.from(thumbnails).findIndex(thumb => 
                thumb.classList.contains('active')
            );
            
            if (e.key === 'ArrowLeft' && currentIndex > 0) {
                thumbnails[currentIndex - 1].click();
            } else if (e.key === 'ArrowRight' && currentIndex < thumbnails.length - 1) {
                thumbnails[currentIndex + 1].click();
            }
        } catch (error) {
            console.error('Error in keyboard navigation:', error);
        }
    });
} 