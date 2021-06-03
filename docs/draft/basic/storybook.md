# StoryBook(v0.0.1)

老版本

```html
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
  <title>500px contact form: {{subject}}</title>
  <style type="text/css">
  body {
    word-break: break-word;
  }

  table, p, tr, td {
    margin: 0;
    border: 0;
    padding: 0;
    border-spacing: 0;
    max-width: 100%;
  }

  a, a:visited {
      color: #0870d1;
      text-decoration: none;
  }

  a:hover {
      color: #2986F7;
  }

  p {
    margin-bottom: 16px;
    line-height: 1.4em;
  }

  img {
    display: block;
    outline: none;
    border: 0;
    max-width: 100%;
    margin: 0 auto;
  }

  body {
    font-family: 'Helvetica Neue', Helvetica, sans-serif;
    color: #000;
    font-size: 14px;
    margin: 0;
  }

  h1, h2, h3, h4, h5, h6 {
    display: block;
    margin: 0 0 8px 0;
    padding: 0;
    line-height: 1.25;
  }

  h1 {
    font-size: 24px;
    color: #000;
    font-weight: 600;
  }

  h2 {
    font-size: 16px;
    font-weight: 600;
  }

  h3 {
    font-size: 16px;
    color: #6d7378;
    font-weight: normal;
  }

  hr {
    border: 0;
    border-top: 1px solid #eeeff2;
    margin: 0;
  }
  
  h3.bold {
    color: #525558;
    font-weight: 600;
  }
  
  .blue {
    color: #0870d1;
  }
  
  .headline {
    font-size: 48px;
  }
  
  .no-margin {
    margin-bottom: 0;
  }
  
  .no-bold {
    font-weight: normal;
  }

  .spacer-xsmall {
    height: 8px;
  }

  .spacer-small {
    height: 16px;
  }

  .spacer-medium {
    height: 24px;
  }

  .spacer-large {
    height: 32px;
  }

  .spacer-xlarge {
    height: 64px;
  }

  .cta {
    height: 48px;
    padding: 0 20px;
    font-size: 16px;
    font-weight: 600;
    border-radius: 48px;
  }

  .cta-white {
    border: 2px solid #0870d1;
  }

  .cta-blue {
    border: 2px solid #0870d1;
    color: #FFF;
    background-color: #0870d1;
  }

  .cta-blue a {
    color: #FFF;
  }

  .background-table {
    width: 100%;
  }

  .content-table {
    width: 100%;
    max-width: 465px;
    margin: 0 auto;
  }
  
  .header {
    width: 100%;
    padding: 64px 0 32px;
  }

  .header-logo {
    width: 96px;
    margin: 8px auto;
  }

  .title-block h1, .title-block h2, .title-block h3, .title-block p {
    text-align: center;
  }
  
  .title-block p.sender_info {
    text-align: left;
  }
  
  
  .small-text {
    color: #6d7378;
    font-size: 12px;
  }
  
  .list-item {
    margin: 0;
  }
  
  .footer-wrap {
    width: 100%;
    background-color: #f7f8fa;
    padding: 60px 0;
    margin-top: 64px;
  }

  .footer {
    max-width: 350px;
    width: 100%;
    margin: 0 auto;
    text-align: center;
    font-size: 12px;
  }

  .footer img {
    margin: 0 auto;
  }

  .social-icon {
    padding: 0 12px;
    display: inline-block;
  }

  @media only screen and (max-width: 599px) {
    body {
      font-size: 16px !important;
    }
    
    .content-table {
      padding: 0 24px !important;
    }
  
    .spacer-small {
      height: 8px !important;
    }
    
    .spacer-medium {
      height: 16px !important;
    }

    .spacer-large {
      height: 24px !important;
    }
  }

</style>

</head>

<!-- DO NOT EDIT: OPENING EMAIL BODY TAGS & HEADER -->

<body>
  <table class="background-table">
    <tr>
      <td>
        <table class="content-table">
          <tr>
            <td>
              <table class="header">
                <tr>
                  <td>
                    <!-- BLOCK: 500PX LOGO -->
                    <img class="header-logo" src="https://gallery.mailchimp.com/8458a1360acf0c9269f8bfaf5/images/36edba60-c335-4869-9a8f-6fc9deed4d19.png">
                  </td>
                </tr>
              </table>
            </td>
          </tr>

<!-- END OF DO NOT EDIT -->


          <!-- BLOCK: TITLE -->

          <tr>
            <td class="title-block">
              <h1>Contact form response to your 500px portfolio on {{domain_name}}</h1>
              <table class="spacer-small"><tr><td></td></tr></table>
              
              <p class="sender_info">{{sender_name}}</p>
              
              <p class="sender_info">{{sender_email}}</p>
              
              <h2 class="narrow no-margin no-bold">{{message}}</h2>

              <table class="spacer-large"><tr><td></td></tr></table>
            </td>
          </tr>

          <tr>
            <td>
              <table class="spacer-large"><tr><td></td></tr></table>
            </td>
          </tr>
        </table>

<!-- DO NOT EDIT: CLOSING EMAIL BODY TAGS & FOOTER -->

      </td>
    </tr>
  </table>

  <table class="footer-wrap">
    <tr>
      <td>
        <table class="footer">
          <tr>
            <td>
              <img alt="500px" src="https://gallery.mailchimp.com/8458a1360acf0c9269f8bfaf5/images/5abe1361-c197-48cb-9974-9b30d348b7cb.png" width="100px">
              <table class="spacer-large"><tr><td></td></tr></table>
              <h2 class="bold">Connecting the world's photographers.</h2>
              <hr style="margin: 32px 0;">
              <a href="https://twitter.com/500px" alt="500px Twitter" target="_blank"> <img alt="500px Twitter" src="https://appboy-images.com/appboy/communication/assets/image_assets/images/5aff21c7a12f746009818d56/original.png?1526669767" width="24" class="social-icon"></a>
              <a href="https://www.facebook.com/500px/" alt="500px Facebook" target="_blank"><img alt="500px Facebook" src="https://appboy-images.com/appboy/communication/assets/image_assets/images/5aff21b7a12f746009818d54/original.png?1526669751" height="24" class="social-icon"></a>
              <a href="https://www.instagram.com/500px/?hl=en" alt="500px Instagram" target="_blank"><img alt="500px Instagram" src="https://appboy-images.com/appboy/communication/assets/image_assets/images/5b043aa97dea0d32c9424b7a/original.png?1527003817" height="24" class="social-icon"></a>
              <a href="https://www.pinterest.ca/500px/" alt="500px Pinterest" target="_blank"><img alt="500px Pinterest" src="https://appboy-images.com/appboy/communication/assets/image_assets/images/5aff21f6a12f746111818aee/original.png?1526669814" width="24" class="social-icon"></a>
              <table class="spacer-medium"><tr><td></td></tr></table>
              <p class="small-text">
                20 Duncan Street, Toronto, ON, Canada M5H 3G8<br>
                Update your <a href="https://{{host}}/settings/account/notifications">email preferences</a>
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>

</body>
</html>
```

