<!DOCTYPE html>
<!--[if !IE]><!-->
<html lang="$ContentLocale">
<head>
    <% base_tag %>
    <title><% if $MetaTitle %>$MetaTitle<% else %>$Title<% end_if %> $SiteConfig.Title</title>
    <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    $MetaTags(false)
    <link rel="stylesheet" href="/css/main.css" />
    <link rel="shortcut icon" href="/images/favicon.ico" />
    <% if GoogleDataLayer %>
    <script>
      $GoogleDataLayer.RAW
    </script>
    <% end_if %>

    <!-- Google Tag Manager -->
    <script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
    'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
    })(window,document,'script','dataLayer','GTM-MF76GNN');</script>
    <!-- End Google Tag Manager -->

</head>
<body>
<!-- Google Tag Manager (noscript) -->
<noscript><iframe src="https://www.googletagmanager.com/ns.html?id="
height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>

<% include Header %>
<div role="main">
	$Layout
</div>
<% include Footer %>

<script src="/javascript/vendor.min.js" /></script>
<script src="/javascript/main.min.js" /></script>

</body>
</html>
