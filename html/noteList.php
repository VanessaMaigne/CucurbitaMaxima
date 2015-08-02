<HTML>

<HEAD>
    <meta http-equiv="Content-Type" content="text/html;charset=utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>Cucurbita Maxima Note</title>
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

    <script type="text/javascript" src="../js/library/d3.js"></script>
    <script type="text/javascript" src="../js/library/d3.tip.min.js"></script>
    <script type="text/javascript" src="../js/library/dc.js"></script>
    <script type="text/javascript" src="../js/library/crossfilter.js"></script>

    <script type="text/javascript" src="../js/cucurbitaMaximaNote.js"></script>
</HEAD>

<BODY>

<div class="container">
    <div class="row col-sm-12 col-md-12">
        <div class="col-sm-2 col-md-1"><BR/><a href="../index.html"><img src="../img/120.png" width="40px"/></a></div>
        <div class="text-center"><h2>Liste des fiches signalétiques végétales</h2><BR/></div>

        <div id="dataDiv" class="col-sm-12 col-md-12">
            <div id="data-count" class="dc-data-count dc-chart">
                <h5><span id="total-count"></span><span>&nbsp;lignes</span></h5>
                <BR/><BR/>
            </div>

            <table id="data-table" class="table table-hover dc-data-table dc-chart">
                <thead>
                <tr id="headerData" class="header"></tr>
                </thead>
            </table>
        </div>

    </div>

    <!--Github link-->
    <a href="https://github.com/you"><img style="position: absolute; top: 0; right: 0; border: 0;" src="https://camo.githubusercontent.com/e7bbb0521b397edbd5fe43e7f760759336b5e05f/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f6769746875622f726962626f6e732f666f726b6d655f72696768745f677265656e5f3030373230302e706e67" alt="Fork me on GitHub" data-canonical-src="https://s3.amazonaws.com/github/ribbons/forkme_right_green_007200.png"></a>

    <script type="text/javascript">
        $(window).load(function() {
            var cucurbitaMaxima = new CucurbitaMaximaNoteList();
            cucurbitaMaxima.init();
        });
    </script>

</BODY>
</HTML>

