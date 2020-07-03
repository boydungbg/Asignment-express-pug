$("#addtocart").on("click", function () {
  $.ajax({
    type: "POST",
    url: "/cozastore/shoping-cart/add-to-cart",
    data: {
      id: $(".js-id").val(),
      size: $(".js-size").val(),
      color: $(".js-color").val(),
      quantity: $(".js-quantity").val(),
      name: $(".js-name").val(),
      price: $(".js-price").val(),
      img: $(".js-img").val(),
    },
    success: function (data) {
      console.log(data);
    },
  });
});
