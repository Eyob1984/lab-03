'use strict';

// I got a suggestion from one of the TA to make these JSON data as global not to write down get function twice.
let page1 = './data/page-1.json';
let page2 = './data/page-2.json';
let AllImages = [];

function Image(Img) {
  for(let key in Img){
    this[key] = Img[key];
  }
}
Image.prototype.toHtml = function() {
  let source = $('#photo-template').html();
  let template = Handlebars.compile(source);
  return template(this);
};
Image.prototype.toDropdown = function() {
  let source = $('#imageList').html();
  let template = Handlebars.compile(source);
  return template(this);
};
let readJson = (pageNumber) => {

  AllImages = [];
  $.get(pageNumber)
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
    let exists = false;
    $('#selectBox option').each(function(){
      if(this.value === image.keyword){
        exists = true;
      }
    });
    if(exists === false){
      //add element to parent
      $('select').append(image.toDropdown());
    }
  });
};
//Event handler function
let imageSelector = (event) => {
  $('section').hide();
  let img = $(`img[value="${event.target.value}"]`).parent();
  $(img).show();
};
//Drop-down list event handler
$('#selectBox').on('change', imageSelector);

// Json page selector functions
let pageOneSelector = () => {
  // Images .holdingArray for the first data = [];
  $('section').remove();
  readJson(page1);
};
let pageTwoSelector = () => {
  // Images.holdingArray for the second data= [];
  $('section').remove();
  readJson(page2);
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
//  these codes are also from code challenge
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
$('#page1').on('click', pageOneSelector);
$('#page2').on('click', pageTwoSelector);

$('#title').on('click', titleSort);
$('#horns').on('click', hornSort);


$(() => readJson(page1));

