<HTML>

<HEAD>
    <meta http-equiv="Content-Type" content="text/html;charset=utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>Cucurbita Maxima Sawing Sheet</title>
    <link rel="icon" href="../img/tomato_16.png" type="image/png">

    <!-- ************************* CSS ************************* -->
    <link rel="stylesheet" type="text/css" href="../js/bootstrap-3.1.1-dist/css/bootstrap.min.css">
    <link rel="stylesheet" type="text/css" href="//code.jquery.com/ui/1.11.4/themes/smoothness/jquery-ui.css">
    <link rel="stylesheet" type="text/css" href="../js/select2/select2.css"/>
    <link rel="stylesheet" type="text/css" href="../css/home.css">


    <!-- ************************* JS ************************* -->
    <script type="text/javascript" src="../js/library/jquery-1.9.1.js"></script>
    <script type="text/javascript" src="../js/library/jquery-ui-1.10.4.custom.min.js"></script>
    <script type="text/javascript" src="../js/select2/select2.js"></script>
    <script type="text/javascript" src="../js/library/d3.js"></script>
    <script type="text/javascript" src="../js/library/crossfilter.js"></script>
    <script type="text/javascript" src="../js/bootstrap-3.1.1-dist/js/bootstrap.js"></script>
    <script type="text/javascript" src="../js/library/jquery.i18n.properties-1.0.9.js"></script>

    <script type="text/javascript" src="../js/helper.js"></script>
    <script type="text/javascript" src="../js/cucurbitaMaxima.js"></script>
    <script type="text/javascript" src="../js/cucurbitaMaximaSawingSheet.js"></script>
</HEAD>


<BODY>

<div class="container">
    <div class="row col-sm-12 col-md-12">
        <div class="col-sm-2 col-md-2"><BR/>
            <a href="../index.html"><img src="../img/120.png" class="basicButton" width="40px" title="Retour page d'accueil"/></a>
            <a href="sawingSheetList.php"><img src="../img/16.png" class="basicButton" width="40px" title="Liste des fiches"/></a>
        </div>
        <div class="text-center"><h2 class="sawingTitle">Fiche de culture</h2><BR/><BR/></div>


        <form id="createForm" class="form-horizontal">

            <div class="form-group">
                <div class="col-sm-2"><label for="nameSelect">Nom</label></div>
                <div class="col-sm-5">
                    <select id="nameSelect" style="width: 50%"></select>
                </div>
            </div>
            <div class="form-group">
                <div class="col-sm-2"><label for="variety">Variété</label></div>
                <div class="col-sm-5"><input id="variety" class="form-control"/></div>
            </div>
            <div class="form-group">
                <div class="col-sm-2"><label for="moonBegin">Phase lunaire</label></div>
                <div class="col-sm-1"><label for="moonBegin" class="note">période</label></div>
                <div class="col-sm-2"><input id="moonBegin" class="form-control" placeholder="début de phase"/></div>
                <div class="col-sm-2"><input id="moonEnd" class="form-control" placeholder="fin de phase"/></div>
            </div>
            <div class="form-group">
                <div class="col-sm-offset-2 col-sm-1"><label for="moon" class="note">indication</label></div>
                <div class="col-sm-4"><input id="moon" class="form-control"/></div>
            </div>
            <div class="form-group">
                <div class="col-sm-2"><label for="groundSelect">Sol</label></div>
                <div class="col-sm-5">
                    <select id="groundSelect" style="width: 50%"></select>
                </div>
            </div>
            <div class="form-group">
                <div class="col-sm-2"><label for="typeSelect">Type</label></div>
                <div class="col-sm-5">
                    <select id="typeSelect" style="width: 50%"></select>
                </div>
            </div>
            <div class="form-group">
                <div class="col-sm-2"><label for="plantDate">Date de plantation</label></div>
                <div class="col-sm-2"><input id="plantDate" class="form-control"/></div>
                <div class="col-sm-2" id="plantDateWeek"></div>
                <div class="col-sm-6" id="plantDateWarning"></div>
            </div>
            <div class="form-group">
                <div class="col-sm-2"><label for="cycle">Cycle végétatif</label></div>
                <div class="col-sm-5"><input id="cycle" class="form-control" placeholder="en jours"/></div>
            </div>

            <div class="form-group">
                <div class="col-sm-2"><label>Récolte prévue le</label></div>
                <div class="col-sm-5" id="cropDate"></div>
                <BR/><BR/>
            </div>

            <div class="form-group">
                <div class="col-sm-2"><label for="distanceL"><img src="../img/distanceL.jpg" width="40px" title="Distance entre les semis"/></label></div>
                <div class="col-sm-5"><input id="distanceL" class="form-control" placeholder="distance dans le rang"/></div>
            </div>
            <div class="form-group">
                <div class="col-sm-2"><label for="distanceR"><img src="../img/distanceR.png" width="33px" title="Distance entre les rangs"/></label></div>
                <div class="col-sm-5"><input id="distanceR" class="form-control" placeholder="distance entre les rangs"/></div>
            </div>

            <div class="form-group">
                <div class="col-sm-2"><label for="weather"><img src="../img/weather2.png" width="40px" title="Exposition"</label></div>
                <div class="col-sm-5"><input id="weather" class="form-control" placeholder="exposition"/></div>
            </div>
            <div class="form-group">
                <div class="col-sm-2"><label for="temperature" class="formGroupImg"><img src="../img/temperature.jpg" width="50px" title="Température (C°)"</label></div>
                <div class="col-sm-5"><input id="temperature" class="form-control" placeholder="température (C°)"/></div>
            </div>

            <div class="form-group">
                (TODO : voir pour phase lunaire, liée à la variété et non au nom, alerte si date de plantation ne colle pas)
            </div>
        </form>

        <div id="actionMessage" class="col-sm-2 col-md-2 text-center"></div>

        <div class="col-sm-5 text-center">
            <button id="saveForm" class="btn btn-success">Enregistrer</button>
            <button id="resetForm" class="btn btn-danger">Annuler</button>
        </div>
    </div>

    <!--Github link-->
    <!--    <a href="https://github.com/you"><img style="position: absolute; top: 0; right: 0; border: 0;" src="https://camo.githubusercontent.com/e7bbb0521b397edbd5fe43e7f760759336b5e05f/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f6769746875622f726962626f6e732f666f726b6d655f72696768745f677265656e5f3030373230302e706e67" alt="Fork me on GitHub" data-canonical-src="https://s3.amazonaws.com/github/ribbons/forkme_right_green_007200.png"></a>-->

    <script type="text/javascript">
        $(window).load(function() {
            new CucurbitaMaximaSawingSheet().create();
        });

    </script>

</BODY>
</HTML>

