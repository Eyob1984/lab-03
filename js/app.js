'use strict';

// I got a suggestion from one of the TA to make these JSON data as global not to write down get function twice.
let pageI = './data/page-1.json';
let pageII = './data/page-2.json';
let AllImages = [];

function Image(Img) {
  for(let key in Img){
    this[key] = Img[key];
  }
}
Image.prototype.toHtml = function() {
  let source = $('#image-template').html();
  let template = Handlebars.compile(source);
  return template(this);
};
Image.prototype.toDropdown = function() {
  let source = $('#imageList').html();
  let template = Handlebars.compile(source);
  return template(this);
};
// pages referces to page I and II
let readJson = (pages) => {

  AllImages = [];
  $.get(pages)
    .then(imageData => {
      imageData.forEach(image => {
        AllImages.push(new Image(image));
      });
    })
    .then(titleSort);
};
let loadImages = () => {
  AllImages.forEach(image => {

    $('main').append(image.toHtml());
  });
  dropDrown();
};
let dropDrown = () => {
  AllImages.forEach(image => {
    let finds = false;
    $('#selectBox option').each(function(){
      if(this.value === image.keyword){
        finds = true;
      }
    });
    if(finds === false){
      $('select').append(image.toDropdown());
    }
  });
};
let imageSelector = (event) => {
  $('section').hide();
  let img = $(`img[value="${event.target.value}"]`).parent();
  $(img).show();
};
$('#selectBox').on('change', imageSelector);
let pageISelector = () => {
  $('section').remove();
  readJson(pageI);
};
let pageIISelector = () => {
  $('section').remove();
  readJson(pageII);
};

//Sort functions
// taken from code challenge 03
let titleSort = () => {
  AllImages.forEach( () => {
    AllImages.sort( (a,b) => {
      if(a.title < b.title){
        return -1;
      }
      if(a.title > b.title){
        return 1;
      }
      return 0;
    });
    return AllImages;
  });
  $('section').remove();
  loadImages();
};
//  these codes are also from code challenge-03
let hornSort = () => {
  AllImages.forEach( () => {
    AllImages.sort( (a,b) => {
      return a.horns - b.horns;
    });
    return AllImages;
  });
  $('section').remove();
  loadImages();
};
$('#pageI').on('click', pageISelector);
$('#pageII').on('click', pageIISelector);

$('#title').on('click', titleSort);
$('#horns').on('click', hornSort);


$(() => readJson(pageI));

