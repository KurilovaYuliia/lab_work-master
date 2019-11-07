// JavaScript Document
jQuery.noConflict();
jQuery(document).ready(function () {

 jQuery('#Form').validate({
         rules: {
                      name: {
						  required:true
						},
                      tel: {
                          required: true
                      }
                  },
                  messages: {
                      name: {
					     required: "Введите Ваше имя"
					  },
                      tel: {
					     required: "Введите Ваш номер телефона"
					 }
                  },
         submitHandler: function(form){			
  
  var name = jQuery('#Form').find('input[name="name"]').val();
  var tel = jQuery('#Form').find('input[name="phone"]').val();
  var email = jQuery('#Form').find('input[name="email"]').val();
  var company = jQuery('#Form').find('input[name="company"]').val();
  var textarea = jQuery('#Form').find('input[name="textarea"]').val();
  
  jQuery.post(
  "/contact.php",
  {
  name: name,
  phone: phone,
  email: email,
  company: company,
  textarea: textarea
  }),
        jQuery('#modal_window').animate({opacity: 'show'}, 400);
		setTimeout(function(){
  			jQuery('#modal_window').animate({opacity: 'hide'}, 400);
		},3000);
	jQuery('#Form input[type="text"]').val('');
	jQuery('#Form input[type="phone"]').val('');
	jQuery('#Form input[type="email"]').val('');
  jQuery('#Form input[type="company"]').val('');
	jQuery('#Form input[type="textarea"]').val('');
         } 
      });	 

});	



