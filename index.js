//El 선언
const $map = document.getElementById('map')
const $mouse = document.querySelector('.mouse');
const $statistics = document.querySelector('.statistics');
const $body_map = document.querySelector('.body_map')
const $map_part = document.querySelector('.map_part')
const $header = document.querySelector('.header')
const $body_prevent = document.querySelector('.body_prevent')
const $prevent = document.querySelector('.prevent')
const $prevent_image = document.getElementsByClassName('prevent_image')
const $prevent_text = document.getElementsByClassName('prevent_text')

//initMap 변수 선언
let map
const city = {"lat": 30.594370610280258, "lng": 114.30300242053443}
const airport = {"lat": 30.77649696678627, "lng": 114.21240424028858}
const incheon = {"lat": 37.46646363463158, "lng": 126.43476860663061}
const hospital = {"lat": 37.47856363463158, "lng": 126.66869860663061}

//지도 구현
function initMap() {
    map = new google.maps.Map($map, {
        zoom: 6,
        center: city,
        scrollwheel: false,
    });
    
    new google.maps.Marker({
        position: city,
        map: map
    });

    //지도 중심 이동 및 마커 추가
    document.addEventListener('scroll', function(){
        if(document.documentElement.scrollTop > parseInt(window.pageYOffset + $body_map.getBoundingClientRect().top) && document.documentElement.scrollTop < parseInt(window.pageYOffset + $body_map.getBoundingClientRect().top + $header.getBoundingClientRect().height)){
            map.panTo(city);
            map.setZoom(8);
        } else if(document.documentElement.scrollTop > parseInt(window.pageYOffset + $body_map.getBoundingClientRect().top + $header.getBoundingClientRect().height) && document.documentElement.scrollTop < parseInt(window.pageYOffset + $body_map.getBoundingClientRect().top + $header.getBoundingClientRect().height * 2)) {
            new google.maps.Marker({
                position: airport,
                map: map
            });
            map.panTo(airport)
            map.setZoom(14);
        } else if(document.documentElement.scrollTop > parseInt(window.pageYOffset + $body_map.getBoundingClientRect().top + $header.getBoundingClientRect().height * 2) && document.documentElement.scrollTop < parseInt(window.pageYOffset + $statistics.getBoundingClientRect().top - $header.getBoundingClientRect().height * 2)){
            new google.maps.Marker({
                position: incheon,
                map: map
            });
            map.panTo(incheon)
            map.setZoom(14);
        } else if(document.documentElement.scrollTop > parseInt(window.pageYOffset + $statistics.getBoundingClientRect().top - $header.getBoundingClientRect().height * 2)){
            new google.maps.Marker({
                position: hospital,
                map: map
            });
            map.panTo(hospital)
            map.setZoom(16);
        }
    })
}

//지도 구현
window.initMap = initMap;

//새로고침시에도 지도가 제대로 위치해 있을 수 있도록 구현
if(document.documentElement.scrollTop > parseInt(window.pageYOffset + $statistics.getBoundingClientRect().top - $statistics.getBoundingClientRect().height)){
    $body_map.style.paddingTop = `400vh`
}

//새로고침시에 마우스 휠 표시가 정상적으로 뜨도록 구현
if(document.documentElement.scrollTop !== 0){
    $mouse.classList.remove('mouse_animation')
}

//첫 페이지 마우스 휠 표시
document.addEventListener('scroll', function(){
    if(document.documentElement.scrollTop !== 0){
        $mouse.classList.remove('mouse_animation')
    } else {
        $mouse.classList.add('mouse_animation')
    }
})

//지도페이지 뜨는 메시지 구현
document.addEventListener('scroll', function(){
    if(document.documentElement.scrollTop + 300 > parseInt(window.pageYOffset + $body_map.getBoundingClientRect().top) && document.documentElement.scrollTop + 200 < parseInt(window.pageYOffset + $body_map.getBoundingClientRect().top + $header.getBoundingClientRect().height)){
        $map_part.children[1].classList.add("content_fadeIn")
        $map_part.children[1].classList.remove("content_fadeOut")
    } else {
        $map_part.children[1].classList.remove("content_fadeIn")
        $map_part.children[1].classList.add("content_fadeOut")
    }

    if(document.documentElement.scrollTop > parseInt(window.pageYOffset + $body_map.getBoundingClientRect().top + $header.getBoundingClientRect().height) && document.documentElement.scrollTop + 300 < parseInt(window.pageYOffset + $body_map.getBoundingClientRect().top + $header.getBoundingClientRect().height * 2)){
        $map_part.children[2].classList.add("content_fadeIn")
        $map_part.children[2].classList.remove("content_fadeOut")
    } else {
        $map_part.children[2].classList.remove("content_fadeIn")
        $map_part.children[2].classList.add("content_fadeOut")
    }

    if(document.documentElement.scrollTop > parseInt(window.pageYOffset + $body_map.getBoundingClientRect().top + $header.getBoundingClientRect().height * 2) && document.documentElement.scrollTop + 300 < parseInt(window.pageYOffset + $statistics.getBoundingClientRect().top - $header.getBoundingClientRect().height * 2)){
        $map_part.children[3].classList.add("content_fadeIn")
        $map_part.children[3].classList.remove("content_fadeOut")
    } else {
        $map_part.children[3].classList.remove("content_fadeIn")
        $map_part.children[3].classList.add("content_fadeOut")
    }

    if(document.documentElement.scrollTop > parseInt(window.pageYOffset + $statistics.getBoundingClientRect().top - $header.getBoundingClientRect().height * 2) && document.documentElement.scrollTop < parseInt(window.pageYOffset + $statistics.getBoundingClientRect().top- $header.getBoundingClientRect().height)){
        $map_part.children[4].classList.add("content_fadeIn")
        $map_part.children[4].classList.remove("content_fadeOut")
    } else {
        $map_part.children[4].classList.remove("content_fadeIn")
        $map_part.children[4].classList.add("content_fadeOut")
    }
})

//지도 페이지 fixed 구현
document.addEventListener('scroll', function(){
    if($map_part.classList[1] === 'map_fixed'){
        $body_map.style.paddingTop = `${(window.pageYOffset - $header.getBoundingClientRect().height)}px`
        if(document.documentElement.scrollTop > parseInt(window.pageYOffset + $statistics.getBoundingClientRect().top - $statistics.getBoundingClientRect().height)){
            $body_map.style.paddingTop = `400vh`
            $map_part.classList.remove('map_fixed')
        } else if(document.documentElement.scrollTop < parseInt($header.getBoundingClientRect().height)){
            $body_map.style.paddingTop = `0`
            $map_part.classList.remove('map_fixed')
        }
    } else {
        if(document.documentElement.scrollTop > parseInt(window.pageYOffset + $body_map.getBoundingClientRect().top) && document.documentElement.scrollTop < parseInt(window.pageYOffset + $statistics.getBoundingClientRect().top - $statistics.getBoundingClientRect().height)){
            $map_part.classList.add('map_fixed')
        }
    }
});

//세계지도 차트 구현
const url = "https://unpkg.com/world-atlas@2.0.2/countries-50m.json";

fetch('./data/world-covid-data.json').then(result => result.json()).then((dataset) => {
    fetch(url).then(result => result.json()).then((datapoint) => {
        //나라 뽑아내기
        const countries = ChartGeo.topojson
                            .feature(datapoint, datapoint.objects.countries).features;

        //차트를 그리기 위한 데이터셋
        const data = {
            labels: countries.map(country => country.properties.name),
            datasets: [{
                label: 'Countries',
                data: countries.map(country => ({
                    feature: country,
                    value: country.properties.name.includes("United States") ? parseInt(dataset["United States"]) : (dataset[country.properties.name] !== undefined ? parseInt(dataset[country.properties.name]) : 0)
                }))
            }]
        };
        
        //차트 옵션
        const config = {
            type: 'choropleth', //차트 모양 > 지구본 타입 설정
            data,
            options: {
                showOutline: true, //지구본 원형라인 잡아주기
                showGraticule: true, //지구본 위, 경도선 그려주기
                scales: {
                    xy: {
                        projection: 'equalEarth' //지구본 모양으로 변경
                    }
                },
                plugins: {
                    legend: {
                        display: false //chart.js차트 범례 숨기기(별도 표기가 됨)
                    }
                }
            }
    
        };
    
        new Chart(
            document.getElementById('mapChart'),
            config
        );  
    });
})

//확진자 수 차트 구현
const $context = document.getElementById('lineChart').getContext('2d');
fetch('./data/korea-covid-data.json').then(result => result.json()).then((data) => {
    new Chart($context, {
        type: 'line',
        data: {
            labels: data.data.map((value) => value.date),
            datasets: [
                {
                    label: '당일 코로나 확진자 수',
                    data: data.data.map((value) => value.confirm),
                    backgroundColor: ["white"],
                    borderColor: ['black'],
                    borderWidth: 2
                }
            ]
        },
        options: {
            plugins: {
                legend: {
                    display: false 
                }
            },
            scales: {
                x: {
                  title: {
                    display: true,
                    text: '날짜'
                  },
                },
                y: {
                  title: {
                    display: true,
                    text: '확진자 수'
                  },
                  min: 20000,
                  max: 160000,
                  ticks: {
                    stepSize: 35000
                  }
                }
            }
        }
    });
})

//하단 예방파트 고정
document.addEventListener('scroll', function(){
    if(document.documentElement.scrollTop < parseInt(window.pageYOffset + $body_prevent.getBoundingClientRect().top)){
        $prevent.classList.remove('prevent_fixed')
    } else {
        $prevent.classList.add('prevent_fixed')
    }
})

//새로고침 시에도 유지되도록 구현
if(document.documentElement.scrollTop >= parseInt(window.pageYOffset + $body_prevent.getBoundingClientRect().top)){
    $prevent.classList.add('prevent_fixed')
}

//하단 예방 파트 스크롤 이벤트 구현
document.addEventListener('scroll', function(){
    if($prevent.classList[1] === 'prevent_fixed'){
        if(document.documentElement.scrollTop > parseInt(window.pageYOffset + $body_prevent.getBoundingClientRect().top) && document.documentElement.scrollTop < parseInt(window.pageYOffset + $body_prevent.getBoundingClientRect().top + $header.getBoundingClientRect().height)){
            $prevent_image[0].classList.remove('prevent_image_close')
            $prevent_image[0].classList.add('prevent_image_open')
            $prevent_text[0].classList.add('prevent_text_open')
            $prevent_image[1].classList.remove('prevent_image_open')
            $prevent_image[1].classList.add('prevent_image_close')
            $prevent_image[1].classList.remove('prevent_image_init')
            $prevent_text[1].classList.remove('prevent_text_open')
            $prevent_image[2].classList.remove('prevent_image_open')
            $prevent_image[2].classList.add('prevent_image_close')
            $prevent_image[2].classList.remove('prevent_image_init')
            $prevent_text[2].classList.remove('prevent_text_open')
        } else if(document.documentElement.scrollTop > parseInt(window.pageYOffset + $body_prevent.getBoundingClientRect().top + $header.getBoundingClientRect().height) && document.documentElement.scrollTop < parseInt(window.pageYOffset + $body_prevent.getBoundingClientRect().top + $header.getBoundingClientRect().height*2)){
            $prevent_image[0].classList.remove('prevent_image_open')
            $prevent_image[0].classList.add('prevent_image_close')
            $prevent_text[0].classList.remove('prevent_text_open')
            $prevent_image[1].classList.add('prevent_image_open')
            $prevent_image[1].classList.remove('prevent_image_close')
            $prevent_text[1].classList.add('prevent_text_open')
            $prevent_image[2].classList.remove('prevent_image_open')
            $prevent_image[2].classList.add('prevent_image_close')
            $prevent_text[2].classList.remove('prevent_text_open')
        } else{
            $prevent_image[0].classList.remove('prevent_image_open')
            $prevent_image[0].classList.add('prevent_image_close')
            $prevent_text[0].classList.remove('prevent_text_open')
            $prevent_image[1].classList.remove('prevent_image_open')
            $prevent_image[1].classList.add('prevent_image_close')
            $prevent_text[1].classList.remove('prevent_text_open')
            $prevent_image[2].classList.add('prevent_image_open')
            $prevent_image[2].classList.remove('prevent_image_close')
            $prevent_text[2].classList.add('prevent_text_open')
        }
    } else {
        $prevent_image[0].classList.remove('prevent_image_open')
        $prevent_text[0].classList.remove('prevent_text_open')
        $prevent_image[1].classList.remove('prevent_image_close')
        $prevent_image[1].classList.add('prevent_image_init')
        $prevent_image[2].classList.remove('prevent_image_close')
        $prevent_image[2].classList.add('prevent_image_init')
    }
})
