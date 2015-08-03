<HTML>

<HEAD>
    <meta http-equiv="Content-Type" content="text/html;charset=utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>Cucurbita Maxima Sheet</title>
    <link rel="icon" href="../img/tomato_16.png" type="image/png">

    <!-- ************************* CSS ************************* -->
    <!--<link rel="stylesheet" type="text/css" href="http://getbootstrap.com/dist/css/bootstrap.min.css">-->
    <link rel="stylesheet" type="text/css" href="../js/bootstrap-3.1.1-dist/css/bootstrap.min.css">
    <link rel="stylesheet" type="text/css" href="../css/home.css">


    <!-- ************************* JS ************************* -->
    <!--<script type="text/javascript" src="http://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>-->
    <!--<script type="text/javascript" src="http://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.11.4/jquery-ui.min.js"></script>-->
    <!--<script type="text/javascript" src="http://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.5/js/bootstrap.min.js"></script>-->
    <script type="text/javascript" src="../js/library/jquery-1.9.1.js"></script>
    <script type="text/javascript" src="../js/library/jquery-ui-1.10.4.custom.min.js"></script>
    <script type="text/javascript" src="../js/bootstrap-3.1.1-dist/js/bootstrap.js"></script>
    <script type="text/javascript" src="../js/library/jquery.i18n.properties-1.0.9.js"></script>

    <script type="text/javascript" src="../js/cucurbitaMaximaSheet.js"></script>
</HEAD>

<BODY>

<div class="container">
    <div class="row col-sm-12 col-md-12">
        <div class="col-sm-2 col-md-1"><BR/><a href="../index.html"><img src="../img/120.png" class="basicButton" width="40px" title="Retour page d'accueil"/></a></div>
        <div class="text-center"><h2>Fiche signalétique végétale</h2><BR/></div>

        <form class="form-horizontal">
            <BR/>
            <div id="dateValue" class="row col-sm-12 col-md-12 text-left"></div>

            <div class="row col-sm-12 col-md-12"><h3>Classification</h3></div>
            <div class="form-group">
                <div class="col-sm-2"><label for="reign">Règne </label></div>
                <div class="col-sm-5"><input id="reign" class="form-control"/></div>
            </div>
            <div class="form-group">
                <div class="col-sm-2"><label for="division">Division = </label></div>
                <div class="col-sm-5"><input id="division" class="form-control"/></div>
            </div>
            <div class="form-group">
                <div class="col-sm-2"><label for="class">Classe = </label></div>
                <div class="col-sm-5"><input id="class" class="form-control" placeholder="Classe par défaut"/></div>
            </div>
            <div class="form-group">
                <div class="col-sm-2"><label for="order">Ordre = </label></div>
                <div class="col-sm-5"><input id="order" class="form-control"/></div>
            </div>
            <div class="form-group">
                <div class="col-sm-2"><label for="family">Famille = </label></div>
                <div class="col-sm-5"><input id="family" class="form-control"/></div>
            </div>
            <div class="form-group">
                <div class="col-sm-2"><label for="gender">Genre = </label></div>
                <div class="col-sm-5"><input id="gender" class="form-control"/></div>
            </div>
            <div class="form-group">
                <label for="exampleInputFile">Télécharger une photo</label>
                <input type="file" id="exampleInputFile">
                <p class="help-block">Taille maximale des photos : .</p>
            </div>

            <div class="row col-sm-12 col-md-12"><h3>Nom binomial </h3></div>

            <div class="row col-sm-12 col-md-12"><h3>Classification phylogénétique</h3></div>
            <div class="form-group">
                <div class="col-sm-2"><label for="orderCP">Ordre = </label></div>
                <div class="col-sm-5"><input id="orderCP" class="form-control"/></div>
            </div>
            <div class="form-group">
                <div class="col-sm-2"><label for="familyCP">Famille = </label></div>
                <div class="col-sm-5"><input id="familyCP" class="form-control"/></div>
            </div>

            <div class="col-md-offset-2 col-sm-5 text-center">
                <button type="submit" class="btn btn-success">Enregistrer</button>
                <button type="submit" class="btn btn-danger">Annuler</button>
            </div>
        </form>
    </div>

    <!--Github link-->
<!--    <a href="https://github.com/you"><img style="position: absolute; top: 0; right: 0; border: 0;" src="https://camo.githubusercontent.com/e7bbb0521b397edbd5fe43e7f760759336b5e05f/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f6769746875622f726962626f6e732f666f726b6d655f72696768745f677265656e5f3030373230302e706e67" alt="Fork me on GitHub" data-canonical-src="https://s3.amazonaws.com/github/ribbons/forkme_right_green_007200.png"></a>-->

    <?php

//    // Load properties file
//    $properties = parse_ini_file( "../cucurbitaMaxima.properties" );
//
//    $fp = fopen ($properties["dataFile"], "r+");
//    $content = fgets ($fp);
//    $nb_visites = $content + 1;
//    fputs ($fp, $nb_visites.",");
//    fclose ($fp);
//    echo 'Contenu : '.$content;
    ?>

    <script type="text/javascript">
        $(window).load(function() {
            var dateValue = $.datepicker.formatDate('DD dd MM yy', new Date());
            $("#dateValue").html(dateValue);

            var cucurbitaMaxima = new CucurbitaMaximaSheetCreate();
            cucurbitaMaxima.init();
        });

    </script>

</BODY>
</HTML>

