Vue.use(VueMarkdown);

new Vue({
  el: '#app',
  data: {
    images: [],
    mainColor: '#333',
    sideColor: '#333',
    projects: [{
  			"dir": "left",
  			"image": "https://pp.userapi.com/c834302/v834302303/31cd2/znvThp769hM.jpg",
  			"github": "https://github.com/Donatelo-app/donatelo-application",
  			"demo": "https://vk.com/donatelo_app",
  			"label": "Donatelo",
  			"description": "VK приложение, которое позволит администраторам групп без особого труда сделать динамическую обложку для групп."
  		},
  		{
  			"dir": "right",
  			"image": "https://camo.githubusercontent.com/380975c43f9ed1ea82981fc99aab476a8f3741f0/68747470733a2f2f70356234793274362e73736c2e687763646e2e6e65742f67616d652d6865616465722f323030302f3133343238382d76707239687074642e6a7067",
  			"github": "https://github.com/AZbang/LINES",
  			"demo": "https://play.google.com/store/apps/details?id=com.azbang.linespro",
  			"label": "LINES",
  			"description": "Геометрическая головоломка, выполненная в минималистичном стиле, в которой Вам придется использовать логику и умения решать задачи не зная поставленной цели. "
  		},
  		{
  			"dir": "left",
  			"image": "https://pp.userapi.com/c840427/v840427972/2e888/BHhJ85ljFDY.jpg",
  			"github": "https://github.com/alxmamaev/DeForestClient",
  			"demo": "http://deforest.herokuapp.com/",
  			"label": "DeForest",
  			"description": "Сервис динамического реестра данных о лесных массивах основанный на технологии блокчейн. Проект разрабатывался совместно с **Внешэкономбанк**"
  		},
  		{
  			"dir": "right",
  			"image": "https://raw.githubusercontent.com/AZbang/media-storage/master/LuiPlayer/screen.PNG",
  			"github": "https://github.com/AZbang/LuiPlayer",
  			"demo": "https://github.com/AZbang/LuiPlayer/releases",
  			"label": "LuiPlayer",
  			"description": "Десктопное приложение на Electron.js для прослушивания музыки с видеохостинга YouTube. Имеет возможность сохранения треков и удобный поиск. "
  		},
  		{
  			"dir": "left",
  			"image": "https://github.com/AZbang/media-storage/raw/master/BlinkShooter/gameplay.gif",
  			"github": "https://github.com/AZbang/BlinkShooter",
  			"demo": "",
  			"label": "BlinkShooter",
  			"description": "**2D Top-down шутер. PC, Mobile.** \n\n Мир выдуманный создателем живет по своим правилам, находясь в зоне комфорта, но что, если правила изменяться? **В разработке...**"
  		},
  		{
  			"dir": "right",
  			"image": "https://github.com/alxmamaev/image-storage/raw/master/escv/header.png",
  			"github": "https://github.com/alxmamaev/ESCV",
  			"demo": "https://github.com/alxmamaev/ESCV",
  			"label": "ESCV",
  			"description": "Электронная система учета посетителей - это совокупность программно аппаратных средств, главной задачей которых является - учет посещений какой либо организации или заведения в электронном виде."
  		},
  		{
  			"dir": "left",
  			"image": "https://camo.githubusercontent.com/e56bd861e3e3ebb2aae2b9d9912eab57913bfbb0/68747470733a2f2f70702e766b2e6d652f633833363732392f763833363732393639312f31373164342f6f35384a43682d5234376b2e6a7067",
  			"github": "https://github.com/AZbang/LearnWords",
  			"demo": "https://azbang.github.io/LearnWords",
  			"label": "LearnWords",
  			"description": "Небольшой интерактивный сервис для изучения иностранных слов. Вам необходимо правильно написать слово перевод с русского на английский. Это поможет запомнить новые слова и повторить написания старых."
  		}
  	],
    links: [
  		{
  			"link": "https://www.instagram.com/azbang_",
  			"icon": "fa-instagram"
  		},
  		{
  			"link": "https://vk.com/id216312691",
  			"icon": "fa-vk"
  		},
  		{
  			"link": "https://twitter.com/azbang_",
  			"icon": "fa-twitter"
  		},
  		{
  			"link": "https://github.com/AZbang",
  			"icon": "fa-github"
  		},
  		{
  			"link": "https://telegram.me/AZbang",
  			"icon": "fa-telegram"
  		}
  	]
  },
  computed: {
    currentImage() {
      return this.images[Math.floor(Math.random()*this.images.length)] ;
    }
  },
  mounted() {
    var feed = new Instafeed({
      get: 'user',
      userId: ['5473040943'],
      accessToken: '5473040943.1677ed0.310dd6df7df6491db1c6bed94ffde2a8',
      resolution: 'standard_resolution',
      limit: 50,
      filter: (image) => {
        if(image.tags.indexOf('homepage') >= 0) {
          this.images.push(image.images.standard_resolution.url);
          return true;
        } else return false;
      },
      after: () => {
        let img = document.createElement('img');
        img.crossOrigin = "Anonymous";
        img.setAttribute('src', this.currentImage);

        img.addEventListener('load', () => {
          let colorThief = new ColorThief();
          let main = colorThief.getColor(img);
          let back = colorThief.getPalette(img)[1];
          let maincolor = `rgb(${main[0]}, ${main[1]}, ${main[2]})`;
          let backcolor = `rgb(${back[0]}, ${back[1]}, ${back[2]})`;
          this.mainColor = maincolor;
          this.sideColor = backcolor;
          renderPoly('background', window.innerWidth, window.innerHeight, maincolor, backcolor);
          blurBg('blur', img, window.innerWidth, window.innerHeight, 50);
        });
      }
    });
    feed.run();
  }
});
