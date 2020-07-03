var categories = [
  {
    fashion: "Women",
    subCategory: ["Shoes", "Trousers", "Shirts", "Bags", "Watches", "Dress"],
  },
  {
    fashion: "Men",
    subCategory: ["Shoes", "Trousers", "Shirts", "Bags", "Watches"],
  },
  {
    fashion: "Kids",
    subCategory: ["Shoes", "Trousers", "Shirts", "Bags", "Watches"],
  },
];

var categoryChoose = document.getElementById("inputCategory");
var ListSubcategory = document.getElementById("list-subcategory");

categoryChoose.addEventListener("change", () => {
  console.log(categoryChoose.value);
  renderSubCategory(categoryChoose.value);
});
function renderSubCategory(categoryValue) {
  var content = [
    `<div class="form-group row"><label class="col-sm-4 col-form-label" for="inputSubCategory">Sub Category</label>
      <div class="col-sm-8"><select class="form-control col-sm-7" id="inputSubCategory" name="subCategory">`,
  ];
  var subcategory = [];
  categories.filter((category) => {
    if (category.fashion === categoryValue) {
      subcategory = category.subCategory;
    }
  });
  content = content.concat(
    subcategory.map(
      (value) => "<option value=" + value + ">" + value + "</option>"
    )
  );
  console.log(content);
  ListSubcategory.innerHTML = content.join("") + "</select></div></div>";
}

var images = document.getElementById("image-path");
var listImage = document.getElementById("list-image");

var content = [
  `<div class="form-group row"><label class="col-sm-4 col-form-label" for="inputImage">Image</label><div class="col-sm-8 text-left"><div class='col-7 pl-0 pr-0'>`,
];
var imagesArray = images.getAttribute("image").split(/[,"\]\[]/);

function renderImage() {
  imagesArray = imagesArray.filter((value) => value != "");
  content = content.concat(
    imagesArray.map(
      (value) =>
        "<img class='img-thumbnail mr-3' src='" + value + "' width= '25%'/>"
    )
  );
  if (imagesArray != "") {
    listImage.innerHTML = content.join("") + "</div></div></div>";
  }
}
renderImage();

var chooseImg = document.getElementById("inputImage");

chooseImg.addEventListener("change", (e) => {
  console.log(e.target.files);
  renderImageUpdate(e.target.files);
});

function renderImageUpdate(listimg) {
  content = [
    `<div class="form-group row"><label class="col-sm-4 col-form-label" for="inputImage">Image</label><div class="col-sm-8 text-left"><div class='col-7 pl-0 pr-0'>`,
  ];
  listimg = Array.from(listimg);
  content = content.concat(
    listimg.map(
      (value) =>
        "<img class='img-thumbnail mr-3' src='" +
        window.URL.createObjectURL(value) +
        "' width= '25%'/>"
    )
  );
  listImage.innerHTML = content.join("") + "</div></div></div>";
}
