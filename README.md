<font size=5>__Projet de développement informatique: Réalisation d’un site web pour le
suivi des travaux des *JO 2024*__</font>
-

*Réalisé par le groupe ***PDI23*** pour le compte de ***SNCF Réseau****
____

Vidéo dans le lien suivant : [Lien de la vidéo](https://ensgeu-my.sharepoint.com/:v:/g/personal/jacques_jiang_ensg_eu/EffJ_acctYNIr8bAXI9eQlQBW964pgJ9dIo3QdEnzKsbWA?e=Tbahag)

____
Dans le cadre du projet développement informatique, nous avons développé pour le compte de ***SNCF réseau*** une application de cartographie web. 

Notre but est de pouvoir afficher une carte des zones de travaux en cours, la carte des travaux projetés pour ensuite pouvoir faire une analyse des travaux. Pour cela nous avons dans notre application, 4 onglets en haut qui sont celui de l'accueil, de la connexion, de l'aide et du chargement des données.


Nous avons comme fonctionnalité de d'abord pouvoir afficher une carte avec les travaux en cours, les travaux à réaliser, les travaux qui doivent être réalisés, les travaux finis. Nous avons également la possibilité d'afficher les sections en travaux.

Dans ce but nous avons utilisé plusieurs technologies pour établir notre base de données. Ainsi, nous utilisons :
1. **PostgreSQL**, pour gérer notre base de données
2. Les technologies du **web** __*(JS, PHP, HTML, CSS)*__ pour afficher le site internet
3. Nous utilisons la bibliothèque **Leaflet** pour gérer la cartographie du site
4. La bibliothèque **JQuery** pour tout ce qui est filtre temporel

Parmi toutes les bibliothèques JS de cartographie qui existent, nous utilisons **Leaflet** car elle est la plus utilisée et elle est très puissante pour faire afficher des choses.

De plus, nous utilisons également JQuery comme bibliothèque, car, elle contient des fonctionnalités essentielles comme la possibilité de faire une selection par attribut date et la mise en place d'un slider.
Ce que nous voudrions faire à l'avenir c'est de faire une vraie page d'aide pour pouvoir inclure les fonctionnalités nécessaires.
____
Ce *ReadMe* à (entre autre) pour but de pouvoir vous aider à installer et à utiliser cette version de l'application de cartographie web que nous développons pour le compte de la ***SNCF***. Ainsi, avec ce tutoriel, vous pourrez installer une version locale du projet.

Pour commencer, nous avons besoin d'un serveur et d'un navigateur web. Ainsi, nous recommendons d'installer un navigateur qui supporte les standanrd du web moderne, n'importe quelle navigateur moderne fera l'affaire : *Firefox, Safari, Opéra, Edge* …. Nous aurions besoin d'un serveur web, par exemple, WAMP marchera bien.

En ce qui concerne la liste complète, regardez : 
1. __Navigateur Web__ *(Firefox, Safari, Opéra, Edge …)*
2. __Serveur Web__ *(WAMP, MAMP …)*
3. **Un seveur de donnée PostGIS** *(extension de PostGreSQL, n'utilisez pas MySQL)*
4. **GeoServer** *(nous utilisons la 2.21.1, avec JRE 1.8.0.1)*
5. **QGIS** *(Pour pouvoir gérer graphiquement les données de la base SQL, c'est pratique mais pas nécessaire)*

___*Remarque :*___

Il faut absolument que la configuration de **Geoserver** soit faite, il faut activer les requêtes **CORS** qui se trouve dans les fichiers de configuration de Geoserver, cela permet de pouvoir faire les requêtes en __WFS__ qui sinon ne pourront pas être faites.

L'installation se fait en installant le **serveur web** d'abord, puis en mettant dans une base de donnée, impérativement nommée "*travauxJO24*". Il est impératif de le nommer à cette manière pour permettre de faire fonctionner la base de donnée dans l'aplication sans avoir de bug. Les données sont mis sur **pgSQL** en restaurant la BDD. Ensuite avec **GéoServer**, il faut initialiser et configurer avec la mise en place d'un espace de travail qui permet de charger toutes les couches. Il faut ensuite glisser le dossier dans un dossier et charger par la suite les couches. Enfin, une fois le tout installé, il derait y avoir tout qui s'initialise correctement.
Ah oui, il faut configurer le *WFS* et le *WMS* dans **GeoServer** avant utilisation.
____
**Fonctionnalité développé dans le cadre du projet :**

- Affichage sur la carte : 

<img src="Rendus/illustration ReadMe/Affichage_carte.png" alt=""></img>

- D'abord, nous avons l'affichage des objets sur la carte :

<img src="Rendus/illustration ReadMe/Selection_elements.png" alt=""></img>

- Nous avons également l'affichage par filtre temporel (sliders + calendrier) :

<img src="Rendus/illustration ReadMe/filtre_temporel.png" alt=""></img>
<img src="Rendus/illustration ReadMe/filtre_date.png" alt=""></img>

- Heatmap :

<img src="Rendus/illustration ReadMe/heatmap.png" alt=""></img>

- Sélection par attributs :

<img src="Rendus/illustration ReadMe/selection_attributs.png" alt=""></img>

- Responsive :

<img src="Rendus/illustration ReadMe/Responsive.png" alt=""></img>
<img src="Rendus/illustration ReadMe/Responsive_objet.png" alt=""></img>

- Calcul du taux de "recouvrement" i.e. le taux de travaux finis :

<img src="Rendus/illustration ReadMe/Recouvrement.png" alt=""></img>

Ceci ne s'affiche pas sur la carte, mais uniquement comme graphique, pour cette fonction c'est quelque chose qu'on pourra faire
____
***Fonctionnalités en cours de développement***
Nous avons 2 fonctionnalités en cours de développement, ainsi, nous avons tout d'abord l'outil de connexion (développé à l'aide de **Bootstrap** du côté **front-end** et en **back-end** en *PHP, SQL*) et l'outil de mise à jour des données *BD Platine* (base de données des travaux programmés) et *BD CAPA* (base de données des travaux en réalisation).

Screens associés :
- Connexion :

<img src="Rendus/illustration ReadMe/Login.png" alt=""></img>
- Mise à jour des données :

<img src="Rendus/illustration ReadMe/Upload.png" alt=""></img>
____
____

**Remerciments et crédit pour :**


1. Les développeurs des bibliothèques suivantes, sans vous on aurait pas d'application :
- **Leaflet**
- **JQuery**
- **Bootstrap**
2. La ***SNCF***, notamment ***SNCF Réseau*** évidemment pour les données fournies qui permettent de pouvoir travailler dessus
3. Le commanditaire, Jonathan Moreau

4. Le groupe PDI23 :
- Insaf Bouabdallaoui
- Axel Dumont
- Chaima Hasdi
- Jacques Jiang
___