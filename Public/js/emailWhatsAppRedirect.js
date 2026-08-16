Array.from(document.getElementsByClassName('emailRedirect')).forEach(element => {
  element.style.cursor = "pointer";
  console.log(element);
});

// i use the Array.from() because the getElementsByClassName does not provide array by default it provides htmlcollection

// Alternatively we can use querySelectorAll because it provides nodelist which the foreach supports

// i have used both of them separately just to learn them

document.querySelectorAll('.emailRedirect').forEach(emailElements => {
  emailElements.addEventListener('click', ()=>{

      console.log("page is redirecting to Email");
      // Escape special characters to prevent URL breakage
    const encodedEmail = encodeURIComponent(document.getElementById('email-id').innerText);
    const subject = encodeURIComponent("Inquiry regarding your services");
    const body = encodeURIComponent("Hello,\n\nI would like to inquire about...");

    // Construct the Gmail compose URL
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodedEmail}&su=${subject}&body=${body}`;
    
    // Open in a new tab
    window.open(gmailUrl, '_blank');
    });
});

    let whatsAppNum = document.getElementById('whatsAppNum');
    document.getElementsByClassName('whatsAppRedirect')[0].addEventListener('click', ()=>{
      window.open(`https://wa.me/${whatsAppNum.innerText}`, '_blank');

      console.log("page is redirecting to whatsapp" , whatsAppNum.innerText);
    });