window.onload=function() {
    // Month,Day,Year,Hour,Minute,Second
    upTime('jan,01,2013,00:00:00'); // ****** Change this line!
  };
  function upTime(countTo) {
    now = new Date();
    countTo = new Date(countTo);
    difference = (now-countTo);
    days=Math.floor(difference/(60*60*1000*24)*1);
    years = Math.floor(days / 365);
    if (years > 1){ days = days - (years * 365)}
    hours=Math.floor((difference%(60*60*1000*24))/(60*60*1000)*1);
    mins=Math.floor(((difference%(60*60*1000*24))%(60*60*1000))/(60*1000)*1);
    secs=Math.floor((((difference%(60*60*1000*24))%(60*60*1000))%(60*1000))/1000*1);
    document.getElementById('years').firstChild.nodeValue = years;
    document.getElementById('days').firstChild.nodeValue = days;
    document.getElementById('hours').firstChild.nodeValue = hours;
    document.getElementById('minutes').firstChild.nodeValue = mins;
    document.getElementById('seconds').firstChild.nodeValue = secs;
  
    clearTimeout(upTime.to);
    upTime.to=setTimeout(function(){ upTime(countTo); },1000);
  }

var HeartsBackground = {
    heartHeight: 60,
    heartWidth: 64,
    hearts: [],
    heartImage: 'http://i58.tinypic.com/ntnw5.png',
    maxHearts: 8,
    minScale: 0.4,
    draw: function() {
      this.setCanvasSize();
      this.ctx.clearRect(0, 0, this.w, this.h);
      for (var i = 0; i < this.hearts.length; i++) {
        var heart = this.hearts[i];
        heart.image = new Image();
        heart.image.style.height = heart.height;
        heart.image.src = this.heartImage;
        this.ctx.globalAlpha = heart.opacity;
        this.ctx.drawImage (heart.image, heart.x, heart.y, heart.width, heart.height);
      }
      this.move();
    },
    move: function() {
      for(var b = 0; b < this.hearts.length; b++) {
        var heart = this.hearts[b];
        heart.y += heart.ys;
        if(heart.y > this.h) {
          heart.x = Math.random() * this.w;
          heart.y = -1 * this.heartHeight;
        }
      }
    },
    setCanvasSize: function() {
      this.canvas.width = window.innerWidth;
      this.canvas.height = window.innerHeight;
      this.w = this.canvas.width;
      this.h = this.canvas.height;
    },
    initialize: function() {
      this.canvas = $('#canvas')[0];
  
      if(!this.canvas.getContext)
        return;
  
      this.setCanvasSize();
      this.ctx = this.canvas.getContext('2d');
  
      for(var a = 0; a < this.maxHearts; a++) {
        var scale = (Math.random() * (1 - this.minScale)) + this.minScale;
        this.hearts.push({
          x: Math.random() * this.w,
          y: Math.random() * this.h,
          ys: Math.random() + 1,
          height: scale * this.heartHeight,
          width: scale * this.heartWidth,
          opacity: scale
        });
      }
  
      setInterval($.proxy(this.draw, this), 30);
    }
  };
  
  $(document).ready(function(){
    HeartsBackground.initialize();
  });

  getQuote(function() {
    $('.box').eq(0).addClass('show')
  });
  
  $("#rand").on("click", function(){
    $('#quote').fadeOut()
    $('#author').fadeOut()
    getQuote();
  });
  
  function getQuote(callback) {
      $.getJSON("https://raw.githubusercontent.com/btford/philosobot/master/quotes/love.json", function(jsonx) {
        
      var html = "";
      var quoteSize = Object.keys(jsonx.quotes).length;
      var index = Math.floor(Math.random() * quoteSize);
      var author = "";
      var quote = jsonx.quotes[index].quote;
        
      html += "<div>" + quote + "</div>";
      author += jsonx.quotes[index].author;
      $("#quote").html(html);
      $("#author").html((author == 'undefined') ? '' : '- ' + author);
      $('#quote').fadeIn()
      $('#author').fadeIn()
      callback()
    });
  }