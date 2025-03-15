document.addEventListener('DOMContentLoaded', () => {
    // 文字动画效果 - 从左到右出现
    const animateTextElements = document.querySelectorAll('.animate-text');
    
    // 依次显示文字元素
    animateTextElements.forEach((element, index) => {
        setTimeout(() => {
            element.style.transition = 'opacity 1s ease, transform 1s ease';
            element.style.opacity = '1';
            element.style.transform = 'translateX(0)';
        }, 150 * index); // 每个元素延迟显示
    });
    
    // 卡片鼠标跟随效果 - "来拒去留"效果
    const cards = document.querySelectorAll('.card');
    
    cards.forEach(card => {
        // 保存卡片的初始变换样式
        const initialTransform = window.getComputedStyle(card).transform;
        
        card.addEventListener('mousemove', (e) => {
            // 获取鼠标在卡片上的相对位置
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left; // 鼠标X坐标相对于卡片
            const y = e.clientY - rect.top;  // 鼠标Y坐标相对于卡片
            
            // 计算旋转角度，根据鼠标位置调整
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            // 计算鼠标距离中心的偏移量，并转换为旋转角度
            const rotateX = ((centerY - y) / 10).toFixed(2); // 上下移动影响X轴旋转
            const rotateY = ((x - centerX) / 10).toFixed(2); // 左右移动影响Y轴旋转
            
            // 计算鼠标距离卡片边缘的距离，用于缩放效果
            const distanceFromEdge = Math.min(
                x, y, rect.width - x, rect.height - y
            );
            
            // 距离边缘越近，缩放效果越明显
            const scale = 1 + Math.max(0, (50 - distanceFromEdge) / 500);
            
            // 应用3D变换效果
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${scale}) translateZ(20px)`;
            
            // 添加光影效果
            const brightness = 1 + (centerY - y) * 0.01;
            card.style.filter = `brightness(${brightness})`;
        });
        
        // 鼠标离开时恢复原状
        card.addEventListener('mouseleave', () => {
            card.style.transition = 'all 0.6s cubic-bezier(0.23, 1, 0.32, 1)';
            card.style.transform = initialTransform;
            card.style.filter = 'brightness(1)';
            
            // 添加轻微的弹跳效果
            setTimeout(() => {
                card.style.transform = initialTransform;
            }, 100);
        });
        
        // 鼠标进入时取消过渡效果，使移动更流畅
        card.addEventListener('mouseenter', () => {
            card.style.transition = 'none';
        });
    });
    
    // 页面加载完成后的动画
    setTimeout(() => {
        document.body.classList.add('loaded');
        
        // 添加卡片的初始动画
        cards.forEach((card, index) => {
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = card.style.transform || 'translateY(0)';
            }, 300 + index * 150);
        });
    }, 500);
}); 