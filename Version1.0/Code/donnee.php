<!DOCTYPE html>
<html lang="ja">
    <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        
        <title>Mise à jour</title>
        
        <link rel="stylesheet" href="navbar.css">
        <link rel="stylesheet" href="style.css">
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-KK94CHFLLe+nY2dmCWGMq91rCGa5gtU4mk92HdvYe+M/SXH301p5ILy+dN9+nJOZ" crossorigin="anonymous">
        
        <link rel="stylesheet" href="https://unpkg.com/leaflet@1.8.0/dist/leaflet.css" crossorigin="" />
        
        <link href="https://fonts.googleapis.com/css2?family=Rozha+One&display=swap" rel="stylesheet">
        
        <script src="https://unpkg.com/leaflet@1.8.0/dist/leaflet.js" crossorigin="" ></script>
    </head>
    <body>
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
        
        <form method="post" enctype="multipart/form-data" id="form_upl">
            <div>
                <label for="image_uploads">Sélectionner un fichier (GeoJSON) que vous voulez mettre à jour</label>
                <input type="file" id="geojson_uploads" name="geojson_uploads" accept=".GeoJSON, .json" class="btn btn-outline-light">
            </div>
            <div class="preview" >
                <p>Aucun fichier sélectionné pour le moment</p>
            </div>
            <div>
                <button type="submit" class="btn btn-outline-success" id="butMAJ"> Mettre à jour</button>
            </div>
        </form>
        
<script src='maj.js'> </script>
</body>

</html>


