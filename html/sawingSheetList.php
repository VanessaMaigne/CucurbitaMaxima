<HTML>

<HEAD>
    <meta http-equiv="Content-Type" content="text/html;charset=utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>Cucurbita Maxima Sawing Sheet</title>
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
    <script type="text/javascript" src="../js/cucurbitaMaximaSawingSheet.js"></script>
</HEAD>

<BODY>

<div class="container containerHome">
    <div>
        <div class="col-xs-5 col-md-3"><BR/>
            <a href="../index.html"><img src="../img/120.png" class="basicButton" width="50px" title="Retour page d'accueil"/></a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <a href="sawingSheetCreate.php"><img src="../img/11.png" class="basicButton" width="50px" title="Saisir une fiche"/></a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <a href="statistics.php"><img src="../img/78.png" class="basicButton" width="50px" title="Prévision des récoltes"/></a>
        </div>

        <div class="col-xs-7 col-md-9 text-center"><h2 class="sawingTitle">Liste des fiches de culture</h2><BR/><BR/></div>
    </div>


    <div id="dataDiv" class="col-sm-12 col-md-12">
        <div id="data-count" class="dc-data-count dc-chart">
            <h5 class="sawingNumberSheet"><span id="total-count"></span><span>&nbsp;fiche(s)</span></h5>
        </div>

        <table id="data-table" class="table table-hover dc-data-table dc-chart">
            <thead>
            <tr id="headerData" class="header"></tr>
            </thead>
            <tbody id="dataContent"></tbody>
        </table>
    </div>

</div>

<!--Github link-->
<!--    <a href="https://github.com/you"><img style="position: absolute; top: 0; right: 0; border: 0;" src="https://camo.githubusercontent.com/e7bbb0521b397edbd5fe43e7f760759336b5e05f/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f6769746875622f726962626f6e732f666f726b6d655f72696768745f677265656e5f3030373230302e706e67" alt="Fork me on GitHub" data-canonical-src="https://s3.amazonaws.com/github/ribbons/forkme_right_green_007200.png"></a>-->

<script type="text/javascript">
    $(window).load(function() {
        new CucurbitaMaximaSawingSheet().list();
    });
</script>

</BODY>
</HTML>

