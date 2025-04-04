// 스무스 스크롤 기능
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
  });
  
  document.addEventListener('DOMContentLoaded', function() {
      // 이메일 팝업
      const emailIcon = document.getElementById('email-icon');
      const emailPopup = document.getElementById('email-popup');
      
      // 디스코드 팝업
      const discordIcon = document.getElementById('discord-icon');
      const discordPopup = document.getElementById('discord-popup');
      
      // 모든 닫기 버튼
      const closeButtons = document.querySelectorAll('.close-popup');
  
      // 이메일 아이콘 클릭 이벤트
      emailIcon.addEventListener('click', function(e) {
          e.preventDefault();
          emailPopup.style.display = 'block';
          discordPopup.style.display = 'none'; // 다른 팝업 닫기
      });
  
      // 디스코드 아이콘 클릭 이벤트
      discordIcon.addEventListener('click', function(e) {
          e.preventDefault();
          discordPopup.style.display = 'block';
          emailPopup.style.display = 'none'; // 다른 팝업 닫기
      });
  
      // 닫기 버튼 이벤트
      closeButtons.forEach(button => {
          button.addEventListener('click', function() {
              emailPopup.style.display = 'none';
              discordPopup.style.display = 'none';
          });
      });
  
      // 팝업 외부 클릭 시 닫기
      window.addEventListener('click', function(e) {
          if (e.target.classList.contains('popup')) {
              emailPopup.style.display = 'none';
              discordPopup.style.display = 'none';
          }
      });
  });