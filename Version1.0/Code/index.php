<!DOCTYPE html>
<html lang="ja">
  <head>
    <meta charset="utf-8" />
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
    />
    <title>Travaux JO24</title>
    <link
      rel="stylesheet"
      href="https://unpkg.com/leaflet@1.8.0/dist/leaflet.css"
      crossorigin=""
    />
    <link href="https://fonts.googleapis.com/css2?family=Rozha+One&display=swap" rel="stylesheet">
    
    <script
      src="https://unpkg.com/leaflet@1.8.0/dist/leaflet.js"
      crossorigin=""
    ></script>

    <script src='https://cdn.plot.ly/plotly-2.20.0.min.js'></script>

    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css"
    />
    <link rel="stylesheet" href="L.Control.SlideMenu.css" />
    <script src="L.Control.SlideMenu.js"></script>
    <link rel="stylesheet" href="navbar.css">
    <link rel="stylesheet" href="style.css">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-KK94CHFLLe+nY2dmCWGMq91rCGa5gtU4mk92HdvYe+M/SXH301p5ILy+dN9+nJOZ" crossorigin="anonymous">
    
    <link rel="stylesheet" href="https://code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">

    <script src="https://code.jquery.com/jquery-3.7.0.min.js"></script>
    <script src="https://code.jquery.com/ui/1.13.0/jquery-ui.min.js"></script>




    <style>
      html { overflow-y: hidden; }
      
      #map {
        position: absolute;
        width: 100%;
        height: 94%;
        font-weight: 400;
        margin: 0; 
        padding: 0

      }

      .content {
        margin: 0.25rem;
        border-top: 1px solid #000;
        padding-top: 0.5rem;
      }

      .header {
        font-size: 1.8rem;
        color: #7f7f7f;
      }

      .title {
        font-size: 1.1rem;
        color: #7f7f7f;
        font-weight: bold;
      }

      .bottom {
        margin-top: 64px;
        font-size: 0.8rem;
        color: #7f7f7f;
      }
    </style>

  </head>
  <body style="margin: 0; padding: 0">

    <div class="nav">
        <input type="checkbox" id="nav-check">
        <div class="nav-header">
            <div class="nav-title">
            SNCF Réseau
            </div>
        </div>
        <div class="nav-btn">
            <label for="nav-check">
            <span></span>
            <span></span>
            <span></span>
            </label>
        </div>
        
        <div class="nav-links">

            <a href="index.php" >Application</a>
            <a href="donnee.php" >Données</a>
            <a href="aide.php" >Aides</a>
            <a href="login.php" >Connexion</a>
        
        </div>
    </div>

    <div id="map"></div>
    <div id="mapid"></div>

    <!--
    <img src="http://localhost:8080/geoserver/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH=20&HEIGHT=20&LAYER=travauxJO24:RGI_PT_ROUTE_IDF" />
    -->
        
    <script src="leaflet-heat.js"></script>
    <script src='index.js'> </script>
    
    
  </body>
</html>