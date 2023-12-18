/**
 * Nous créeons les Feature Group (une extension des Layer Grouo) pour pouvoir les manipuler plus tard
 * Nos layerGroup sont crées pour afficher les layers
 * @name
 */
var time_layer_group=L.featureGroup();
var platine_layer_group=L.featureGroup();
var capa_event_layer_group=L.featureGroup();

/**
 * Nous créons une variable sliderControl qui est nulle dans un premier temps
 * @name
 */
var sliderControl = null;

/**
 * Ici. création des dates de début et fin pour la BD_CAPA et la BD_Platine
 * @name
 */
var date_debut = Infinity;
var date_fin = -Infinity;
var date_min = Infinity;
var date_max = -Infinity;

/**
 * Nous chargeons les éléments en WFS
 * @name
 */
let platinegeojsonurl="http://localhost:8080/geoserver/travauxJO24/ows?service=WFS&version=1.0.0"+
"&request=GetFeature&typeName=travauxJO24%3APLATINE"+
"&format=text/javascript&outputFormat=application/json"+
"&srsname=EPSG:4326";
let capageojsonurl="http://localhost:8080/geoserver/travauxJO24/ows?service=WFS&version=1.0.0"+
"&request=GetFeature&typeName=travauxJO24%3ACapa_event"+
"&format=text/javascript&outputFormat=application/json"+
"&srsname=EPSG:4326";

/**
 * Nous chargeaons les icones des sites olympiques et celui des gares stratégiques 
 * @name
 */

var icon_gare=L.icon({
    iconUrl:'SVG_icone/icones_gares.svg',
    iconSize: [38, 95],
    iconAnchor: [22, 94],
    popupAnchor: [-3, -76],
})
var icon_olymp=L.icon({
    iconUrl:'SVG_icone/sport-svgrepo-com.svg',
    iconSize: [38, 95],
    iconAnchor: [22, 94],
    popupAnchor: [-3, -76],
})
 
/**
 * On charge les éléments issue de OSM et des données dans la base de données SNCF qui a été mis dans SQL
 * @name
 */
var osm = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap'
});
var OpenStreetMap_France = L.tileLayer('https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png', {
	maxZoom: 20,
	attribution: '&copy; OpenStreetMap France | &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});

/**
 * On charge la carte et on lui ajoute les fonds de cartes dénifis précedemment
 * @name
 */
var map = L.map('map', {
    center: [39.73, -104.99],
    zoom: 10,
    layers: [osm]
}).setView([48.866667, 2.333333], 10);

var baseMaps = {
    "OpenStreetMap": osm,
    "OpenStreetMap France":OpenStreetMap_France 
};

/**
 * On charge la carte et on lui ajoute les fonds de cartes dénifis précedemment
 * @name
 */
var layerControl = L.control.layers(baseMaps).addTo(map);

/**
 * On ajoute l'échelle à notre carte
 * @name
 */
L.control.scale({maxWidth : '100',position:'bottomright',metric:'True'}).addTo(map);

/**
 * Nous allons définir dans le code qui suit le contenu du menu: pour avoir un slider
 * @name
 */

/* contents */
const left = '<div class="header">Contrôles</div>';
let contents = `
<style>
.controls-container {
    flex-basis: 300px;
    max-width: 100%;
    margin-bottom: 10px;
    display: flex;
    flex-direction: column;
}

#icon1 {
    display: inline-block;
    line-height: 30px;
    padding-left: 30px;
    background: url("icon/substract_orange.png") no-repeat scroll 0 0 transparent;
    background-size: 15%;
}

#icon2 {
    display: inline-block;
    line-height: 30px;
    padding-left: 30px;
    background: url("icon/substract_vert.png") no-repeat scroll 0 0 transparent;
    background-size: 15%;
}

#icon3 {
    display: inline-block;
    line-height: 30px;
    padding-left: 30px;
    background: url("icon/region.png") no-repeat scroll 0 0 transparent;
    background-size: 15%;
}

#icon4 {
    display: inline-block;
    line-height: 30px;
    padding-left: 30px;
    background: url("icon/ligne.png") no-repeat scroll 0 0 transparent;
    background-size: 15%;
}

#icon5 {
    display: inline-block;
    line-height: 30px;
    padding-left: 30px;
    background: url("SVG_icone/sport-svgrepo-com.svg") no-repeat scroll 0 0 transparent;
    background-size: 15%;
}

#icon6 {
    display: inline-block;
    line-height: 30px;
    padding-left: 30px;
    background: url("SVG_icone/icones_gares.svg") no-repeat scroll 0 0 transparent;
    background-size: 15%;
}

#icon7 {
    display: inline-block;
    line-height: 30px;
    padding-left: 30px;
    background: url("icon/rail.png") no-repeat scroll 0 0 transparent;
    background-size: 15%;
}

#icon8 {
    display: inline-block;
    line-height: 30px;
    padding-left: 30px;
    background: url("icon/gare.png") no-repeat scroll 0 0 transparent;
    background-size: 15%;
}

#icon9 {
    display: inline-block;
    line-height: 30px;
    padding-left: 30px;
    background: url("icon/substract_mauve.png") no-repeat scroll 0 0 transparent;
    background-size: 15%;
}

@media only screen and (max-width: 768px) {

    .controls-container {
        flex-basis: auto;
        margin-right: 0;
        margin-bottom: 20px;
        display: flex;
        flex-direction: column;
    }

    .field {
        max-width: 70%;
        margin-top: 1vh;
        margin-bottom: 1vh;
    }
}
</style>
<div class="controls-container">
        
<div id="slider-range"></div>
<p>
    <label for="start">Début :</label>
    <input type="text" id="start" readonly style="border:0; color:red; font-weight:bold;">
</p>
<p>
    <label for="end">Fin :</label>
    <input type="text" id="end" readonly style="border:0; color:green; font-weight:bold;">
</p>
<p>Date: <input type="text" id="datepicker">
</br>
<button type="submit" class="btn btn-outline-success" id="rafraichir"> Rafraichir</button>
<button type="submit" class="btn btn-outline-info" id="reinitialiser"> Réinitaliser</button> 
</p>       
<fieldset class="field" id="selection">

<legend>Séléctionner un type de travaux:</legend>
<div>
    <input type="checkbox" id="prog" name="a" value=0 >
    <label for="w_prog" id="icon1">Travaux programmés</label>
</div>

<div>
<input type="checkbox" id="real" name="b" value=1 >
<label for="w_real" id="icon2">Travaux en réalisation</label>
</div> 
</fieldset>
<fieldset class="field2" id="selection2">
<legend>Éléments de la carte :</legend>
<div>
<input type="checkbox" id="lim" name="c" value=2 >
<label for="REGION_SNCF_IDF" id="icon3">Limite de la Région SNCF en IDF</label>
</div> 
<div>
<input type="checkbox" id="lig" name="d" value=3 >
<label for="RGI_LIGNE_IDF" id="icon4">Lignes de Train de la SNCF</label>
</div>
<div>
<input type="checkbox" id="sit" name="d" value=4 >
<label for="sit" id="icon5">Sites olympiques</label>
</div>
<div>
<input type="checkbox" id="gar" name="d" value=5 >
<label for="gar" id="icon6">Gares importantes</label>
</div>


</fieldset>
        <fieldset class="field" id="selection3">
            <legend>Données d'infrastructure:</legend>
            <div>
                <input type="checkbox" id="rail" name="d" value=4 >
                <label for="rail" id="icon7" >Rails</label>
            </div>
            <div>
                <input type="checkbox" id="gares_toutes" name="d" value=5 >
                <label for="gares_toutes" id="icon8">Gares</label>
            </div>
            <div>
                <input type="checkbox" id="zep" name="d" value=5 >
                <label for="zep" id="icon9">ZEP</label>
            </div>
        </fieldset>
        <i>SNCF Réseau pour la fourniture des données et le groupe PDI23 pour la réalisation de la carte leaflet </i>
    </div>`;

/* left */
/**
 * On ajoute le contenu du menu que nous venons de définir dans un slide menu qui serait accessible à partir 
 * d'un menu burger au dessous des icones de zoom
 * @name
 */
L.control.slideMenu(left + contents).addTo(map);

/* Selection par attribut */
const right = '<div class="header">Selectionner</div>';
let select_content = `
<style>
    .controls-container {
        flex-basis: 300px;
        max-width: 100%;
        margin-bottom: 10px;
        display: flex;
        flex-direction: column;
    }

    @media only screen and (max-width: 768px) {

        .controls-container {
            flex-basis: auto;
            margin-right: 0;
            margin-bottom: 20px;
            display: flex;
            flex-direction: column;
        }

        .field {
            max-width: 70%;
            margin-top: 1vh;
            margin-bottom: 1vh;
        }
    }
</style>
    <div class="controls-container">
        <div>
             <form action="#" method="get" id="form" class="d-flex" role="search" autocomplete="off">
                
                <div id="selectCouches"> 
                    <select class="form-control me-2 " id="selectCouche" name="select" placeholder="Selectionner une couche"> </select>  
                    <option value="" selected="true" disabled="disabled">Selectionner une couche</option> 
                <div id="selectChamps"> 
                    <select class="form-control me-2 " id="selectChamp" name="select"> </select>
                    <option value="" selected="true" disabled="disabled">Selectionner un champ</option> 
                </div>
                
                <div id="attribut"> 
                    <select class="form-control me-2 " id="selectValeur" name="select"> </select>
                    <option value="" selected="true" disabled="disabled">Selectionner une valeur</option> 
                </div>
            
                <button type="submit" class="btn btn-outline-success" id="bouton"> Selectionner</button>
                
             </form>
             
        </div>
    <div>
                <input type="checkbox" id="heatmap" name="a" value=0 >
                <label for="heatmap" >Heatmap</label>
    </div>
    <div id="por">
        
    </div>

    </div>`;

/* left */
/**
 * On ajoute le contenu du menu de la selection par attribut que nous venons de définir dans un slide menu qui 
 * serait accessible à partir d'une icone loupe au dessous du premier menu slider
 * @name
 */
L.control.slideMenu(right + select_content, {icon:"fa-solid fa-magnifying-glass"}).addTo(map);

/**
 * Pour afficher les données travaux nous allons résupérer le checkbox associé à chacune des couches
 * @name
 */
let t_prog=document.getElementById("prog");
let t_real=document.getElementById("real");


//affiche la BDD Platine :

let xhttp2= new XMLHttpRequest();
xhttp2.onreadystatechange=function() {
    if (this.readyState==4 && this.status==200){
        afficheGeojson(xhttp2.responseText,t_prog);
    }
}
xhttp2.open("GET",platinegeojsonurl);
xhttp2.send();

function afficheGeojson(donnees,checked){
    //console.log(donnees);
    L.geoJson(JSON.parse(donnees),{
        style: function (feature) {
            return {
                color: 'orange',
                weight:'6'
            };
        },
        onEachFeature: function(feature,layer){
            dateA=new Date(feature.properties.date_debut).toLocaleDateString("fr");
            dateB=new Date(feature.properties.date_fin).toLocaleDateString("fr");
            let Lay=layer.bindPopup('<h3>Travaux programmés </h3> <ul> <li><b>Nature des travaux : </b>'+ feature.properties.nature_d_o +'</li> <li> <b> Ligne : </b>' + feature.properties.ligne +'</li> <li> <b> Pk début : </b>'+ feature.properties.pk_d +'</li> <li> <b> Pk fin : </b>'+ feature.properties.pk_f +'</li> <li> <b> Date de début des travaux : </b>'+ dateA + '</li> <li> <b> Date de fin des travaux : </b>'+ dateB +'</li> </ul>');

            platine_layer_group.addLayer(Lay);
            map.removeLayer(platine_layer_group);
            const startTime = new Date(feature.properties.date_debut).getTime();
            const endTime = new Date(feature.properties.date_fin).getTime();
            date_debut = Math.min(date_debut, startTime);
            date_fin = Math.max(date_fin, endTime);
        }
        })
        checked.addEventListener('change',function(){
            if (this.checked) {
                platine_layer_group.addTo(map);
            }
            else {
                 map.removeLayer(platine_layer_group);
             }

         })

 }  


//affiche la BDD Capa_Event :

let xhttp3= new XMLHttpRequest();
xhttp3.onreadystatechange=function() {
    if (this.readyState==4 && this.status==200){
        afficheGeojson2(xhttp3.responseText,t_real);
    }
}
xhttp3.open("GET",capageojsonurl);
xhttp3.send();

function afficheGeojson2(donnees,checked){
    //console.log(donnees);
    L.geoJson(JSON.parse(donnees),{
        style: function (feature) {
            return {
                color: 'green',
            };
        },
        onEachFeature: function(feature,layer){
            date1=new Date(feature.properties.date_debut).toLocaleDateString("fr");
            date2=new Date(feature.properties.date_fin).toLocaleDateString("fr");
            let Lay=layer.bindPopup('<h3>Travaux en cours </h3> <ul> <li><b>Nature des travaux : </b>'+ feature.properties.nature_travaux +'</li> <li> <b> Ligne : </b>' + feature.properties.code_ligne +'</li> <li> <b> Pk début : </b>'+ feature.properties.pk_d +'</li> <li> <b> Pk fin : </b>'+ feature.properties.pk_f +'</li> <li> <b> Date de début des travaux : </b>'+ date1 + '</li> <li> <b> Date de fin des travaux : </b>'+ date2 +'</li> </ul>');
            //Récupérer les dates de début et de fin des périodes de travaux
            const startTime = new Date(feature.properties.date_debut).getTime();
            const endTime = new Date(feature.properties.date_fin).getTime();
            date_debut = Math.min(date_debut, startTime);
            date_fin = Math.max(date_fin, endTime);
            capa_event_layer_group.addLayer(Lay);
            //map.removeLayer(capa_event_layer_group);
            },
        },
    checked.addEventListener('change',function(e){
        if (this.checked) {
            capa_event_layer_group.addTo(map);
        }
        else {
    
            map.removeLayer(capa_event_layer_group);
        }

        }),
    )
}

/**
 *  @function
 * Chargement des layers et après chargement des fonctions pour gérer le slider et la selection des dates. Les dates
 * sélectionnès sont sauvegardés et les Features non conservés sont mis dans une couche non affiché pour les 
 * conserver en cas de changement de date ou de périodes.
 * Nous utilisons les fonctions de Leaflet pour gérer les layers. 
 * @method
 * Les méthodes .eachLayer nous permet de parcourir les layers.
 */
//gestion des layers
var layers_temps=L.featureGroup();
var layers_temps2=L.featureGroup();
map.removeLayer(layers_temps);
map.removeLayer(layers_temps2);
//Temps
setTimeout(function() {
    $(function() {
    // Spécifier les timestamps de début et de fin (en secondes)

    // Convertir les timestamps en dates
    var startDate = new Date(date_debut);
    var endDate = new Date(date_fin);

    // Initialiser le slider
    $("#slider-range").slider({
        range: true,
        min: date_debut,
        max: date_fin,
        step: 86400, // 1 jour en secondes
        values: [date_debut, date_fin],
        slide: function(event, ui) {
        // Mettre à jour les valeurs de début et de fin
            $("#start").val(new Date(ui.values[0] ).toLocaleDateString('fr'));
            $("#end").val(new Date(ui.values[1] ).toLocaleDateString('fr'));
            date_max =ui.values[1];
            date_min =ui.values[0];
            // console.log(new Date(ui.values[0] ).toLocaleDateString('fr'),new Date(ui.values[1] ).toLocaleDateString('fr'));
            capa_event_layer_group.eachLayer(function (layer){
                if (date_max<new Date(layer.feature.properties.date_debut).getTime()&&date_max<new Date(layer.feature.properties.date_fin).getTime()){
                    layers_temps.addLayer(layer);
                    capa_event_layer_group.removeLayer(layer);
                    // console.log('1',layer.feature.properties.date_debut,layer.feature.properties.date_fin);
                }
                if (date_min>new Date(layer.feature.properties.date_debut).getTime()&&date_min>new Date(layer.feature.properties.date_fin).getTime()){
                    layers_temps.addLayer(layer);
                    capa_event_layer_group.removeLayer(layer);
                    // console.log('3',layer.feature.properties.date_debut,layer.feature.properties.date_fin);
                }
            }),
            platine_layer_group.eachLayer(function (layer){
                if (date_max<new Date(layer.feature.properties.date_debut).getTime()&&date_max<new Date(layer.feature.properties.date_fin).getTime()){
                    layers_temps2.addLayer(layer);
                    platine_layer_group.removeLayer(layer);
                    // console.log('1',layer.feature.properties.date_debut,layer.feature.properties.date_fin);
                }
                if (date_min>new Date(layer.feature.properties.date_debut).getTime()&&date_min>new Date(layer.feature.properties.date_fin).getTime()){
                    layers_temps2.addLayer(layer);
                    platine_layer_group.removeLayer(layer);
                    // console.log('3',layer.feature.properties.date_debut,layer.feature.properties.date_fin);
                }
            }),
            layers_temps.eachLayer(function (layer){
                if (date_max>new Date(layer.feature.properties.date_debut).getTime()&&date_max<new Date(layer.feature.properties.date_fin).getTime()){
                    capa_event_layer_group.addLayer(layer);
                    layers_temps.removeLayer(layer);
                    // console.log('1',layer.feature.properties.date_debut,layer.feature.properties.date_fin);
                }
                if (date_min>new Date(layer.feature.properties.date_debut).getTime()&&date_min<new Date(layer.feature.properties.date_fin).getTime()){
                    capa_event_layer_group.addLayer(layer);
                    layers_temps.removeLayer(layer);
                    // console.log('3',layer.feature.properties.date_debut,layer.feature.properties.date_fin);
                }
            }),
            layers_temps2.eachLayer(function (layer){
                if (date_max>new Date(layer.feature.properties.date_debut).getTime()&&date_max<new Date(layer.feature.properties.date_fin).getTime()){
                    platine_layer_group.addLayer(layer);
                    layers_temps.removeLayer(layer);
                    // console.log('1',layer.feature.properties.date_debut,layer.feature.properties.date_fin);
                }
                if (date_min>new Date(layer.feature.properties.date_debut).getTime()&&date_min<new Date(layer.feature.properties.date_fin).getTime()){
                    platine_layer_group.addLayer(layer);
                    layers_temps.removeLayer(layer);
                    // console.log('3',layer.feature.properties.date_debut,layer.feature.properties.date_fin);
                }
            });
        },
    });

    // Afficher les valeurs de début et de fin initiales
    $("#start").val(startDate.toLocaleDateString());
    $("#end").val(endDate.toLocaleDateString());
    date_max =date_fin;
    date_min =date_debut;
    });

//GetDate
    $( function() {
        $( "#datepicker" ).datepicker({
            dateFormat : 'dd-mm-yy',
            minDate : new Date(date_debut),
            maxDate : new Date(date_fin),
            });
        });

        //GetDate
        var layers_date=L.featureGroup();

        let bouton1=document.getElementById("rafraichir");
        bouton1.addEventListener('click',function(){
                var currentDate=$( "#datepicker" ).datepicker( "getDate" ).getTime();
                map.removeLayer(layers_date);
                if (currentDate!=""||currentDate!=null){
                    capa_event_layer_group.eachLayer(function (layer){
                        if (currentDate<new Date(layer.feature.properties.date_debut).getTime()||currentDate>new Date(layer.feature.properties.date_fin).getTime()){
                            layers_date.addLayer(layer);
                            capa_event_layer_group.removeLayer(layer);
                            // console.log('1',layer.feature.properties.date_debut,layer.feature.properties.date_fin);
                        }
                    });
                    platine_layer_group.eachLayer(function (layer){
                        if (currentDate<new Date(layer.feature.properties.date_debut).getTime()||currentDate>new Date(layer.feature.properties.date_fin).getTime()){
                            layers_date.addLayer(layer);
                            platine_layer_group.removeLayer(layer);
                            // console.log('1',layer.feature.properties.date_debut,layer.feature.properties.date_fin);
                        }})
                };
                
            });
            let bouton2=document.getElementById("reinitialiser");
            bouton2.addEventListener('click',function(){
                map.removeLayer(layers_date);
                t_prog.addEventListener('change',function(){
                    if (this.checked) {
                        layers_date.eachLayer(function (layer){
                            layers_date.removeLayer(layer);
                            platine_layer_group.addLayer(layer);
                        });
                    }
                    
                })
                t_real.addEventListener('change',function(){
                    if (this.checked) {
                        layers_date.eachLayer(function (layer){
                            layers_date.removeLayer(layer);
                            capa_event_layer_group.addLayer(layer);
                        });
                    }
                    
                })
                
                
            $( "#datepicker" ).datepicker( "setDate", null );
            });
    
}, 30000);

   
        

//Pour faire la selection par attribut on récupère le premier bloc où on choisit sur quelle couche on veut faire la sélection
let form=document.getElementById('form');

let selectCouche = form.elements["selectCouche"];
selectCouche.addEventListener("change",choisirChamp);

let selectChamp = document.getElementById('selectChamp');
selectChamp.addEventListener("change",selectionnerValeur);

let selectValeur = document.getElementById('selectValeur');

form.addEventListener("submit",selectionner);

let table="";
let champ="";
let valeur ="";

//le fichier couche.php retourne les tables(couches) qui existent dans la base de données
let lien="couche.php";
fetch(lien,{
    method: 'get',
})
.then(function (reponsehttp){
    return reponsehttp.json();
})
.then(function (reponse){
    selectCouche.innerText="";
    for (var i = 0; i < reponse.length; i++) {
        //On ajoute les noms des tables aux options de la sélection
        let option = document.createElement('option');
        option.textContent=reponse[i].table_name ;
        option.selected = false;
        selectCouche.appendChild(option);
    }
});  

/**
 * Une fois la table est sélectionner on veut récuperer les champs de cette table. Le fichier colonnes.php prend
 * en entrée le nom de la table et retourne ses champs
 * @method
 */


function choisirChamp(){
    let table= selectCouche.value;
    let lien2="colonnes.php?table="+table;
    fetch(lien2,{
        method: 'get',
    })
    .then(function (reponsehttp){
        return reponsehttp.json();
    })
    .then(function (reponse){
        
        selectChamp.innerText="";
        for (var i = 0; i < reponse.length; i++) {
            let option = document.createElement('option');
            //On ajoute les noms des champs aux options de la sélection
            option.textContent=reponse[i].column_name;
            selectChamp.appendChild(option);
        }
    }); 

}

/**
 * quand l'utilisateur sélectionne le champ/attribut sur lequel il veut faire la sélection on veut retourner ses 
 * valeurs dans le troisième bloc de sélection. C'est justement le résultat de la requête dans le fichier selection.php
 * @method
 */

function selectionnerValeur(){
    let table= selectCouche.value;
    let champ= selectChamp.value;
    //Le fichier selection.php prend comme donnée la table et le champ et retourne ses valeurs
    let lien3='selection.php?table="'+table+'"&champ="'+champ+'"';
    fetch(lien3,{
        method: 'get',
    })
    .then(function (reponsehttp){
        return reponsehttp.json();
    })
    .then(function (reponse){
        
        selectValeur.innerText="";
        for (var i = 0; i < reponse.length; i++) {
            let option = document.createElement('option');
            //On ajoute les valeurs du champ sélectionné aux options de la sélection
            option.textContent=reponse[i][champ];
            selectValeur.appendChild(option);
        }
    }); 

}

/**
 * Maintenant que l'utilisateur à tout sélectionner on veut lui afficher le résultat de sa sélection par attribut
 * Pour ce faire on utilise l'attribut cql_filter pour ne retourner que les objets qui vérifient la condition dans le filtre
 * @method
 */
//
function selectionner(event){
    event.preventDefault()
    //console.log("j'ai selectionner par attribut");
    let table= selectCouche.value;
    let champ= selectChamp.value;
    let valeur = selectValeur.value;
    var couche = L.tileLayer.wms("http://localhost:8080/geoserver/wms", {
        layers: 'travauxJO24:'+table,
        format: 'image/png',
        transparent: true,
        attribution: "Realized by means of PDI23 team ®",
        //on filtre la couche par les données que nous avons pour n'afficher que l'objet sélectionné
        cql_filter:""+champ+"='"+valeur+"'"
    });
    couche.addTo(map);
    portion=document.getElementById("por");
    if (table=="RGI_LIGNE_IDF" && champ=="code_ligne"){
        couche.addTo(map);
        valeur=parseInt(valeur);
        let lien4="tauxrecouvr.php?code_ligne="+valeur;
        fetch(lien4,{
            method: 'get',
        })
        .then(function (reponsehttp){
            return reponsehttp.json();
        })
        .then(function (reponse){
            for (var i = 0; i < reponse.length; i++) {
               var p=reponse[i].por;
               //console.log(p);
                 var data = [{
                    values: [p,100-p],
                    labels: ['Travaux rélaisés par rapport au programmés',
                     'Travaux non réalisés par rapport au programmés'],
                    type: 'pie'
                  }];
                  
                  var layout = {
                    height: 400,
                    width: 500
                  };
                  
                  Plotly.newPlot('por', data, layout);
               
                
            }
        });
         

    }
    else{
        portion.innerHTML="";
    }
    
    
    form.addEventListener("submit",function(){
        map.removeLayer(couche);
    })

    


}


/**
 * Pour afficher les données d'infrastructure en wms nous allons récupérer la couche publiée sur geoserver à partir
 * du nomCouche en entrée ensuite on vérifie si le checkbox est vérifié et on est dans un niveau de zoom défini nous 
 * ajoutons la couche à la carte
 * @constructor
 * @param {string} id- L'identifiant de la checkbox à laquelle on voudrait correspondre une couche pour l'afficher.
 * @param {string} nomCouche - Le nom de la couche qu'on voudrait afficher.
 */
function afficherWMS(id,nomCouche){
    check_couche = document.getElementById(id);
    var couche = L.tileLayer.wms("http://localhost:8080/geoserver/wms", {
        layers: 'travauxJO24:'+nomCouche+'',
        format: 'image/png',
        transparent: true,
        attribution: "Realized by means of PDI23 team ®"
    })
    check_couche.addEventListener('change',function(event){
        //Pour afficher les limites de la région SNCF à partir d'un certain niveau de zoom
        
        map.removeLayer(couche);
        
        
            if (this.checked) {
                map.on('zoomend', function() {
                    var actualZoom = map.getZoom();
                    if(actualZoom >10){
                        //console.log(actualZoom);
                        couche.addTo(map);
                    }
                    else{
                        map.removeLayer(couche);
                        
                    }
                })
            }        
            else{
                map.on('zoomend', function() {
                    map.removeLayer(couche);
                    
                })    
            }
    
        
    })
}

/**
 * On appelle la fonction afficherWMS() pour afficer les limites de région SNCF, les voies, les rails, les gares et les zep
 * @name 
 */
afficherWMS('lim','REGION_SNCF_IDF');
afficherWMS('lig','RAI_VOIE_IDF');
afficherWMS('rail','RGI_PT_RAIL_IDF');
afficherWMS('gares_toutes','RGI_GARE_IDF');
afficherWMS('zep','RAI_ZEP_IDF');

/**
 * Pour afficher les gares stratégiques ainsi que les sites olympiques représentés par des icones correspondants 
 * nous chargeons le WFS de chaque couche et en utilisant la fonction
 * @constructor
 * @param {string} id- L'identifiant de la checkbox à laquelle on voudrait correspondre une couche de type point représentée par une image.
 * @param {string} nomCouche - Le nom de la couche qu'on voudrait afficher.
 *  @method
 * La méthode .marker nous permet de manipuler le côté design de la couche ponctuelle en ajoutant des icones.
 */
function afficherIcon(id,nomCouche){
    var couche_marker=L.featureGroup();
    check_couche = document.getElementById(id);

    let coucheWFS="http://localhost:8080/geoserver/travauxJO24/ows?service=WFS&version=1.0.0"+
    "&request=GetFeature&typeName=travauxJO24%3A"+nomCouche+
    "&format=text/javascript&outputFormat=application/json"+
    "&srsname=EPSG:4326";
    //affiche des sites olympiques :
    let xhttp1= new XMLHttpRequest();
    xhttp1.onreadystatechange=function() {
        if (this.readyState==4 && this.status==200){
            afficheGeojsonolymp(xhttp1.responseText);
        }
    }
    xhttp1.open("GET",coucheWFS);
    xhttp1.send();

    function afficheGeojsonolymp(donnees){
        L.geoJson(JSON.parse(donnees),{
            pointToLayer: function (feature, latlng) {
                if(nomCouche == 'Sites_olympique'){
                    let Lay= L.marker(latlng, {icon:icon_olymp}).bindPopup('<h3> Sites olympiques </h3> <ul> <li><b> Lieu  : </b>'+ feature.properties.field1 +'</li> <li> <b> Epreuve : </b>' + feature.properties.field4 +'</li> <li> <b> Nature de la gare : </b>'+ feature.properties.nature + '</li> <li> <b> Région : </b>'+ feature.properties.libelle_re +'</li> </ul>');
                    couche_marker.addLayer(Lay);
                }
                else if(nomCouche == 'Gares_stratégiques_placées'){
                    let Lay= L.marker(latlng, {icon:icon_gare}).bindPopup('<h3>Gares stratégiques </h3> <ul> <li><b>Nom de la gare : </b>'+ feature.properties.libelle +'</li> <li> <b> Ligne : </b>' + feature.properties.code_ligne +'</li> <li> <b> Nature de la gare : </b>'+ feature.properties.nature + '</li> <li> <b> Région : </b>'+ feature.properties.libelle_re +'</li> </ul>');
                    couche_marker.addLayer(Lay);
                }
                
            },
        })
    }

    //affichage des éléments :
    check_couche.addEventListener('change',function(){
        map.removeLayer(couche_marker);
        
        
            if (this.checked) {
                map.on('zoomend', function() {
                    var actualZoom = map.getZoom();
                    if(actualZoom >10){
                        //console.log(actualZoom);
                        couche_marker.addTo(map);
                    }
                    else{
                        map.removeLayer(couche_marker);    
                    }
                })
            }        
            else{
                map.on('zoomend', function() {
                    map.removeLayer(couche_marker);
                    
                })    
            }
        
    })

}

afficherIcon('sit','Sites_olympique');
afficherIcon('gar','Gares_stratégiques_placées');

/**
 * Pour afficher une heatmap repésentant l'intensité des travaux à proximité des gares d'importance
 * @constructor
 * @param {string} id- L'identifiant de la checkbox à laquelle on voudrait correspondre une heatmap.
 * @param {string} nomCouche - Le nom de la couche qui est dans notre cas les gares d'importances.
 */
function heatmap(id,nomCouche){
    let coucheWFS="http://localhost:8080/geoserver/travauxJO24/ows?service=WFS&version=1.0.0"+
    "&request=GetFeature&typeName=travauxJO24%3A"+nomCouche+
    "&format=text/javascript&outputFormat=application/json"+
    "&srsname=EPSG:4326";
    let heatMapBut = document.getElementById(id);
    //On veut ajouter un heatmap pour afficher l'intensité des travaux à proximité des gares d'importance
    let xhttp1= new XMLHttpRequest();
    xhttp1.onreadystatechange=function() {
        if (this.readyState==4 && this.status==200){
            afficherheatMap(xhttp1.responseText);
        }
    }
    xhttp1.open("GET",coucheWFS);
    xhttp1.send();
    
    function afficherheatMap(donnees){
        var heatMapPoints =[];
        L.geoJson(JSON.parse(donnees),{
            pointToLayer: function (feature, latlng) {
                //On ajoute un array qui contient les coordonnées de la gare et le nombre de travaux à proximité de cette gare
                heatMapPoints.push([feature.geometry.coordinates[1],feature.geometry.coordinates[0],feature.properties.count_trav]);
            },
        })
        heatMapBut.addEventListener('change',function(event){
            //Pour afficher les travaux programmés à partir d'un certain niveau de zoom
            if (this.checked) {
                var heat = L.heatLayer(heatMapPoints, {
                    radius: 25,
                    minOpacity: 0.4,
                    gradient: {0.4: 'blue', 0.5: 'lime', 1: 'red'}
                }).addTo(map);}
                else {
                    map.removeLayer(heat);
                }
                heatMapBut.addEventListener("change",function(){
                    map.removeLayer(heat);
                })
            })
        }
    }
heatmap('heatmap','Gares_stratégiques_placées')