<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <title><?php echo basename(__DIR__) ?> — p5 sandbox</title>

    <meta name="author" content="Christoph Senn">
    <meta name="description" content="Experiments in p5.js">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <link rel="stylesheet" href="../assets-global/base.css">
    <link rel="stylesheet" href="style.css">
</head>

<body>

    <section id="p5-container">
    </section>

    <section class="controls">
        <button onClick="window.location.href='../index.html'">&larr;</button>

        <!--<button onClick="window.history.back();">&larr;</button>-->
    </section>

    <script src="../assets-global/p5.min.js"></script>
    <script src="my.js"></script>
    <script src="objects.js"></script>

</body>

</html>
