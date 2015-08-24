<HTML>

<HEAD>
    <meta http-equiv="Content-Type" content="text/html;charset=utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>Cucurbita Maxima Vegetal Sheet</title>
    <link rel="icon" href="../img/tomato_16.png" type="image/png">

    <!-- ************************* CSS ************************* -->
    <link rel="stylesheet" type="text/css" href="../js/bootstrap-3.1.1-dist/css/bootstrap.min.css">
    <link rel="stylesheet" type="text/css" href="../css/home.css">

    <!-- ************************* JS ************************* -->
    <script type="text/javascript" src="../js/library/jquery-1.9.1.js"></script>
    <script type="text/javascript" src="../js/library/jquery-ui-1.10.4.custom.min.js"></script>
    <script type="text/javascript" src="../js/library/d3.js"></script>
    <script type="text/javascript" src="../js/bootstrap-3.1.1-dist/js/bootstrap.js"></script>
    <script type="text/javascript" src="../js/bootstrap-validator-master/js/validator.js"></script>
    <script type="text/javascript" src="../js/library/jquery.i18n.properties-1.0.9.js"></script>

    <script type="text/javascript" src="../js/helper.js"></script>
    <script type="text/javascript" src="../js/cucurbitaMaxima.js"></script>
    <script type="text/javascript" src="../js/cucurbitaMaximaVegetalSheet.js"></script>
</HEAD>

<BODY>

<div class="container containerHome">
    <div>
        <div class="col-sm-2 col-md-2"><BR/>
            <a href="../index.html"><img src="../img/120.png" class="basicButton" width="50px" title="Retour page d'accueil"/></a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <a href="vegetalSheetList.php"><img src="../img/10.png" class="basicButton" width="50px" title="Liste des fiches"/></a>
        </div>

        <div class="col-sm-8 col-md-8 text-center"><h2 class="vegetaleTitle">Fiche signalétique végétale</h2><BR/></div>
        <div id="smallDateValue" class="col-sm-2 col-md-2 text-right"></div>
    </div>


    <form id="createForm" data-toggle="validator" role="form" class="form-horizontal">

        <!-- ************ Right column ************ -->
        <div class="col-sm-5 col-md-4">
            <div class="col-sm-12 col-md-12"><h3>Classification</h3></div>
            <div class="form-group">
                <div class="col-sm-3"><label for="reign">Règne</label></div>
                <div class="col-sm-8"><input id="reign" class="form-control"/></div>
            </div>
            <div class="form-group">
                <div class="col-sm-3"><label for="division">Division</label></div>
                <div class="col-sm-8"><input id="division" class="form-control"/></div>
            </div>
            <div class="form-group">
                <div class="col-sm-3"><label for="class">Classe</label></div>
                <div class="col-sm-8"><input id="class" class="form-control"/></div>
            </div>
            <div class="form-group">
                <div class="col-sm-3"><label for="order">Ordre</label></div>
                <div class="col-sm-8"><input id="order" class="form-control"/></div>
            </div>
            <div class="form-group">
                <div class="col-sm-3"><label for="family">Famille</label></div>
                <div class="col-sm-8"><input id="family" class="form-control"/></div>
            </div>
            <div class="form-group">
                <div class="col-sm-3"><label for="gender">Genre</label></div>
                <div class="col-sm-8"><input id="gender" class="form-control"/></div>
            </div>
            <div class="col-sm-12 col-md-12"><h3>Nom binomial </h3></div>
            <div class="form-group has-feedback">
                <div class="col-sm-3"><label for="binomialName">Nom</label></div>
                <div class="col-sm-8">
                    <input id="binomialName" class="form-control" value="L.1753" data-error="Veuillez remplir ce champ" required/>
                    <span class="glyphicon form-control-feedback" aria-hidden="true"></span>
                </div>
                <div class="col-sm-3 help-block with-errors"></div>
            </div>
        </div>


        <!-- ************ Photos ************ -->
        <div class="col-sm-2 col-md-3">
            <BR/>
            <div id="containerImages">
                <img src="../img/PremiersMelons.JPG" width="100px"/>
                <img src="../img/PremiersMelons.JPG" width="100px"/>
                <img src="../img/PremiersMelons.JPG" width="100px"/>
                <img src="../img/PremiersMelons.JPG" width="100px"/>
            </div>

            <div id="actionMessage" class="col-md-12 text-center"></div>
            <div class="col-md-12 text-center">
                <button id="saveForm" class="btn btn-success">Enregistrer</button><BR/><BR/>
                <button id="resetForm" class="btn btn-danger">Annuler</button>
            </div>
        </div>


        <!-- ************ Left column ************ -->
        <div class="col-sm-5 col-md-5">
            <BR/><BR/><BR/><BR/><BR/><BR/><BR/>
            <div class="row col-sm-12 col-md-12"><h3>Classification phylogénétique</h3></div>
            <div class="form-group">
                <div class="col-sm-3"><label for="orderCP">Ordre</label></div>
                <div class="col-sm-7"><input id="orderCP" class="form-control"/></div>
            </div>
            <div class="form-group">
                <div class="col-sm-3"><label for="familyCP">Famille</label></div>
                <div class="col-sm-7"><input id="familyCP" class="form-control"/></div>
            </div>
            <div class="form-group help-block"><BR/>
                <label for="exampleInputFile">Télécharger une photo (non opérationnel)</label>
                <input type="file" id="exampleInputFile">
                <p class="help-block">Taille maximale des photos : .</p>
            </div>
        </div>
    </form>

</div>

<script type="text/javascript">
    $(window).load(function() {
        new CucurbitaMaximaVegetalSheet().create();
    });

</script>

</BODY>
</HTML>

