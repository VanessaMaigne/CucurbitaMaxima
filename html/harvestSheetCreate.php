<HTML>

<HEAD>
    <meta http-equiv="Content-Type" content="text/html;charset=utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>Cucurbita Maxima Harvest Sheet</title>
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
    <script type="text/javascript" src="../js/bootstrap-validator-master/js/validator.js"></script>
    <script type="text/javascript" src="../js/library/jquery.i18n.properties-1.0.9.js"></script>

    <script type="text/javascript" src="../js/helper.js"></script>
    <script type="text/javascript" src="../js/cucurbitaMaxima.js"></script>
    <script type="text/javascript" src="../js/cucurbitaMaximaHarvestSheet.js"></script>
</HEAD>


<BODY>

<div class="container containerHome">
    <div class="col-xs-12 col-md-12">
        <div class="col-xs-5 col-md-3"><BR/>
            <a href="../index.html"><img src="../img/120.png" class="basicButton" width="50px" title="Retour page d'accueil"/></a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <a href="harvestSheetList.php"><img src="../img/16.png" class="basicButton" width="50px" title="Liste des récoltes"/></a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <a href="harvestStatistics.php"><img src="../img/78.png" class="basicButton" width="50px" title="Prévision des récoltes"/></a>
        </div>

        <div class="col-xs-7 col-md-9 text-center"><h2 class="harvestTitle">Fiche de récolte</h2><BR/><BR/><BR/></div>
    </div>

    <div class="col-xs-12 col-md-12">
        <form id="createForm" data-toggle="validator" role="form" class="form-horizontal">

            <div class="form-group">
                <div class="col-sm-2"><label for="nameSelect">Nom</label></div>
                <div class="col-sm-5">
                    <select id="nameSelect" style="width: 100%"></select>
                </div>
            </div>
            <div class="form-group has-feedback">
                <div class="col-sm-2"><label for="varietySelect">Variété</label></div>
                <div class="col-sm-5">
                    <select id="varietySelect" style="width: 100%"></select>
                </div>
            </div>
            <div class="form-group">
                <div class="col-sm-2"><label for="harvestDate">Date de récole</label></div>
                <div class="col-sm-2"><input id="harvestDate" class="form-control"/></div>
                <div class="col-sm-2" id="harvestDateWeek"></div>
                <div class="col-sm-6 warning" id="harvestDateWarning"></div>
            </div>

            <div class="form-group has-feedback">
                <div class="col-sm-2"><label>Poids</label></div>
                <div class="col-sm-5">
                    <input id="weight" class="form-control" pattern="[0-9]+[,(0-9)+]*" data-error="Champ numérique uniquement (virgule pour les décimales)"/>
                    <span class="glyphicon form-control-feedback" aria-hidden="true"></span>
                </div>
                <div class="col-sm-5 help-block with-errors"></div>
            </div>

            <div class="form-group has-feedback">
                <div class="col-sm-2"><label>Quantité</label></div>
                <div class="col-sm-5">
                    <input id="quantity" class="form-control" pattern="[0-9]+[,(0-9)+]*" data-error="Champ numérique uniquement (virgule pour les décimales)"/>
                    <span class="glyphicon form-control-feedback" aria-hidden="true"></span>
                </div>
                <div class="col-sm-5 help-block with-errors"></div>
                <BR/><BR/>
            </div>

            <div class="form-group has-feedback">
                <div class="col-sm-2"><label>Commentaire</label></div>
                <div class="col-sm-5">
                    <textarea id="comment" class="form-control"></textarea>
                    <span class="glyphicon form-control-feedback" aria-hidden="true"></span>
                </div>
                <div class="col-sm-5 help-block with-errors"></div>
            </div>


            <div id="actionMessage" class="col-md-12 text-center"></div>
            <div class="col-md-12 text-center">
                <button id="saveForm" class="btn btn-success" disable=false>Enregistrer</button>
                <button id="resetForm" class="btn btn-danger">Annuler</button><BR/><BR/>
            </div>

        </form>
    </div>

</div>

<!--Github link-->
<!--    <a href="https://github.com/you"><img style="position: absolute; top: 0; right: 0; border: 0;" src="https://camo.githubusercontent.com/e7bbb0521b397edbd5fe43e7f760759336b5e05f/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f6769746875622f726962626f6e732f666f726b6d655f72696768745f677265656e5f3030373230302e706e67" alt="Fork me on GitHub" data-canonical-src="https://s3.amazonaws.com/github/ribbons/forkme_right_green_007200.png"></a>-->

<script type="text/javascript">
    $(window).load(function() {
        new CucurbitaMaximaHarvestSheet().create();
    });

</script>

</BODY>
</HTML>

