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
    <script type="text/javascript" src="../js/bootstrap-3.1.1-dist/js/bootstrap.js"></script>
    <script type="text/javascript" src="../js/library/jquery.i18n.properties-1.0.9.js"></script>
    <script type="text/javascript" src="../js/library/d3.js"></script>

    <script type="text/javascript" src="../js/helper.js"></script>
    <script type="text/javascript" src="../js/cucurbitaMaxima.js"></script>
    <script type="text/javascript" src="../js/cucurbitaMaximaVegetalSheet.js"></script>
</HEAD>

<BODY>

<div class="container containerHome">
    <div class="col-xs-12 col-md-12">
        <div class="col-xs-3 col-md-2"><br/>
            <a href="../index.html"><img src="../img/120.png" class="basicButton" width="50px" title="Retour page d'accueil"/></a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <a href="vegetalSheetCreate.php"><img src="../img/2.png" class="basicButton" width="50px" title="Saisir une fiche"/></a>
        </div>

        <div class="col-xs-9 col-md-10 text-center"><h2 class="vegetaleTitle">Liste des fiches signalétiques végétales</h2><BR/></div>
    </div>

    <div id="dataDiv" class="col-xs-12 col-md-12">
        <div id="data-count" class="dc-data-count dc-chart">
            <BR/><h5 class="vegetalNumberSheet"><span id="total-count"></span><span>&nbsp;fiche(s)</span></h5><BR/>
        </div>

        <table id="data-table" class="table table-hover dc-data-table dc-chart">
            <thead>
            <tr id="headerData" class="header"></tr>
            </thead>
            <tbody id="dataContent"></tbody>
        </table>
    </div>

</div>

<script type="text/javascript">
    $(window).load(function() {
        new CucurbitaMaximaVegetalSheet().list();
    });
</script>

</BODY>
</HTML>

