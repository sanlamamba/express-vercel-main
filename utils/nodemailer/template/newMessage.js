const newMessageTemplate = (nom, prenom, email, message) => {
  return `
<!doctype html>
<html lang="en-US">

<head>
    <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
    <title>Reset Password Email Template</title>
    <meta name="description" content="Reset Password Email Template.">
    <style type="text/css">
        a:hover {text-decoration: underline !important;}
    </style>
</head>

<body marginheight="0" topmargin="0" marginwidth="0" style="margin: 0px; background-color: #f2f3f8;" leftmargin="0">
    <!--100% body table-->
    <table cellspacing="0" border="0" cellpadding="0" width="100%" bgcolor="#f2f3f8"
        style="@import url(https://fonts.googleapis.com/css?family=Rubik:300,400,500,700|Open+Sans:300,400,600,700); font-family: 'Open Sans', sans-serif;">
        <tr>
            <td>
                <table style="background-color: #f2f3f8; max-width:670px;  margin:0 auto;" width="100%" border="0"
                    align="center" cellpadding="0" cellspacing="0">
                    <tr>
                        <td style="height:80px;">&nbsp;</td>
                    </tr>
                    
                    <tr>
                        <td style="height:20px;">&nbsp;</td>
                    </tr>
                    <tr>
                        <td>
                            <table width="95%" border="0" align="center" cellpadding="0" cellspacing="0"
                                style="max-width:670px;background:#fff; border-radius:3px; text-align:center;-webkit-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);-moz-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);box-shadow:0 6px 18px 0 rgba(0,0,0,.06);">
                                <tr>
                                    <td style="height:40px;">&nbsp;</td>
                                </tr>
                                <tr>
                                    <td style="padding:0 35px;">
                                        <h1 style="color:#1e1e2d; font-weight:500; margin:0;font-size:32px;font-family:'Rubik',sans-serif;">Vous avez un nouveau message !</h1>
								<span
                                            style="display:inline-block; vertical-align:middle; margin:29px 0 26px; border-bottom:1px solid #cecece; width:100px;"></span>
								<h4>
								Un message de : ${nom} ${prenom} - ${email}</h4>
                                        
                                        <p style="color:#455056; font-size:15px;line-height:24px; margin:0;">
                                            ${message}
                                        </p>
                                        
                                    </td>
                                </tr>
                                <tr>
                                    <td style="height:40px;">&nbsp;</td>
                                </tr>
                            </table>
                        </td>
                    <tr>
                        <td style="height:20px;">&nbsp;</td>
                    </tr>
                    <tr>
                        <td style="text-align:center;">
                            <p style="font-size:14px; color:rgba(69, 80, 86, 0.7411764705882353); line-height:18px; margin:0 0 0;">&copy; <strong>www.mams.com</strong></p>
                        </td>
                    </tr>
                    <tr>
                        <td style="height:80px;">&nbsp;</td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
    <!--/100% body table-->
</body>

</html>
  `;
};

const senderNewMessage = () => {
  return `<div class="app font-sans min-w-screen min-h-screen bg-grey-lighter py-8 px-4">

<div class="mail__wrapper max-w-md mx-auto">

  <div class="mail__content bg-white p-8 shadow-md">

    <div class="content__header text-center tracking-wide border-b">
      <div class="text-red text-sm font-bold">MAMS</div>
      <h1 class="text-3xl h-48 flex items-center justify-center">Votre message a été envoyé !</h1>
    </div>

    <div class="content__body py-8 border-b">
      <p>
        Votre message a été envoyé avec succès. Merci de nous avoir contactés. Nous répondrons à votre demande dans les plus brefs délais. En attendant, n'hésitez pas à explorer notre site Web ou à nous contacter pour toute autre question ou préoccupation. Merci de votre patience et bonne journée !
      </p>
     
      
    </div>

    <div class="content__footer mt-8 text-center text-grey-darker">
      <h3 class="text-base sm:text-lg mb-4">Merci pour votre message!</h3>
      <p>www.mams.com</p>
    </div>

  </div>

  

</div>

</div>`;
};

const newMessageTemplates = {
  newMessageTemplate,
  senderNewMessage,
};

module.exports = newMessageTemplate;
