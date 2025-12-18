import React, { useEffect } from "react";
import "./SignalProject.css";

export default function SignalProjectPage() {

  useEffect(() => {
    // Words Reveal delay
    const heroWords = document.querySelectorAll('.hero-section h1 span');
    heroWords.forEach((word,index)=>{
      word.style.animationDelay = `${index*0.12}s`;
    });

    // Accessibility
    const accBtn = document.getElementById('accessibility-btn');
    if(accBtn){
      accBtn.addEventListener('click', e=>{
        e.preventDefault();
        document.body.classList.toggle('high-contrast-mode');
      });
    }

    // Navbar Smooth Scroll
    document.querySelectorAll('.navbar nav a[href^="#"]').forEach(link=>{
      link.addEventListener('click',function(e){
        e.preventDefault();
        const target=document.querySelector(this.getAttribute('href'));
        if(target) target.scrollIntoView({behavior:'smooth'});
      });
    });

    // Hero Parallax
    window.addEventListener('scroll', function(){
      const hero = document.querySelector('.hero-section');
      const scrolled = window.scrollY;
      hero.style.backgroundPosition = `center ${scrolled * 0.5}px`;
      hero.querySelector('.hero-content').style.transform = `translateY(${scrolled*0.2}px)`;
    });
  }, []);

  // Typing effect
  const typeTextEffect = (text) => {
    const area = document.querySelector('.translated-text-area');
    area.textContent = '';
    let index = 0;
    const interval = setInterval(()=>{
      area.textContent += text.charAt(index);
      index++;
      if(index >= text.length) clearInterval(interval);
    },30);
  };

  const handleTypeTranslate = (e) => {
    const inputField=document.createElement('input');
    inputField.type='text'; inputField.placeholder='اكتب هنا لترجمته...';
    inputField.style.padding='10px'; inputField.style.fontSize='16px';
    inputField.style.borderRadius='8px'; inputField.style.border='1px solid #9C6E33';
    inputField.style.width='100%'; inputField.style.marginTop='10px';

    const submitBtn=document.createElement('button');
    submitBtn.textContent='ترجمة';
    submitBtn.style.background='linear-gradient(135deg,#FFC300,#FFB700)';
    submitBtn.style.color='#333'; submitBtn.style.border='none';
    submitBtn.style.padding='10px'; submitBtn.style.borderRadius='8px';
    submitBtn.style.cursor='pointer'; submitBtn.style.fontWeight='700';
    submitBtn.style.marginTop='5px';

    submitBtn.addEventListener('click', ()=>{
      const text = inputField.value.trim();
      if(text) typeTextEffect(text);
      inputField.remove(); submitBtn.remove();
    });

    e.target.parentElement.appendChild(inputField);
    e.target.parentElement.appendChild(submitBtn);
  };

  const handleStartVoice = async () => {
    try{
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      alert('تم منح الإذن للميكروفون! التسجيل جاهز.');
      stream.getTracks().forEach(track => track.stop());
    }catch(err){
      alert('لم يتم منح إذن الميكروفون!');
    }
  };

  const handleUploadAudio = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'audio/*';
    input.onchange = e=>{
      const file = e.target.files[0];
      if(file) alert(`تم اختيار الملف: ${file.name}`);
    };
    input.click();
  };

  const handlePlayAudio = () => alert('تشغيل الصوت!');
  const handleDownloadTranscript = () => alert('تم تحميل النص!');

  return (
    <div>
      <header className="navbar">
        <div className="logo"><i className="fa-solid fa-eye"></i> مشروع الإشارة</div>
        <nav>
          <a href="#hero" className="active"><i className="fa-solid fa-pyramid"></i> الرئيسية</a>
          <a href="#translation"><i className="fa-solid fa-language"></i> الترجمة</a>
          <a href="#"><i className="fa-solid fa-book-skull"></i> تعلم الإشارات</a>
          <a href="#" id="accessibility-btn" className="accessibility-btn"><i className="fa-solid fa-universal-access"></i> وضع الوصول الكامل</a>
          <a href="#"><i className="fa-solid fa-lightbulb"></i> عن الموقع</a>
          <a href="#" className="login-btn">دخول</a>
          <a href="#" className="signup-btn">تسجيل</a>
        </nav>
      </header>

      <section id="hero" className="hero-section">
        <div className="hero-content">
          <h1>
            <span>مرحبا</span>
            <span>بكم</span>
            <span>في</span>
            <span>مشروع</span>
            <span>الإشارة</span>
          </h1>
          <p> تعلم وفهم الإشارات بطريقة ممتعة !</p>
        </div>
      </section>

      <main id="translation" className="container">
        <div className="side-columns left">
          <div className="input-section card">
            <h3>إدخال الصوت</h3>
            <button className="input-button start-voice-btn" onClick={handleStartVoice}><i className="fas fa-microphone"></i> ابدأ التحدث</button>
            <button className="input-button upload-audio-btn" onClick={handleUploadAudio}><i className="fas fa-file-upload"></i> تحميل ملف صوتي</button>
            <button className="input-button type-translate-btn" onClick={handleTypeTranslate}><i className="fas fa-marker"></i> كتابة للترجمة</button>
          </div>
        </div>

        <section className="main-column">
          <div className="card">
            <div className="avatar-card">
              <div className="avatar-box"><i className="fa-solid fa-user-astronaut"></i></div>
              <span>رسوم الأفاتار المتحركة</span>
            </div>
          </div>
          <div className="subtitle-bar"> هنا يظهر النص المترجم بالإشارة</div>
        </section>

        <div className="side-columns right">
          <div className="output-section card" style={{maxWidth:'280px', width:'100%', height:'250px'}}>
            <h3>نص المُخرجات</h3>
            <div className="translated-text-area">أرض الكنانة ترحب بكم... (هنا يظهر النص المترجم)</div>
            <button className="output-button play-audio-btn" onClick={handlePlayAudio}><i className="fas fa-volume-up"></i> تشغيل الصوت</button>
            <button className="output-button download-transcript-btn" onClick={handleDownloadTranscript}><i className="fas fa-file-download"></i> تحميل النص المكتوب</button>
          </div>
        </div>
      </main>
    </div>
  );
}
