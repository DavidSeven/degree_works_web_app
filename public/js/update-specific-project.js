$(document).ready
(
  function ()
  {
    $.ajax
    ({
      type: "post",
      url: "../controllers/update-project.php",
      encode: true,

      success: function (data)
      {
        if (!isNaN (data.identifier) && data.identifier != null)
        {
          console.log ("Package sent");
          console.log (data);
          console.log ("Identifier:" + data.identifier);

          $.ajax
          ({
            type: "post",
            url: "../controllers/read-specific-project-to-update.php",
            data: {identifier: data.identifier},
            encode: true,

            success: function (data)
            {
              console.log ("Package sent");
              console.log (data);
              $("form[name=add-project-form]") [0].reset ();
              var size = data [4].length;
              var investigationLineOptions = "";
              $("input[name=name]").val (data [0][0].name);
              $("input[name=addedDate]").val (data [0][0].addedDate);
              $("input[name=calification]").val (data [0][0].calification);

              for (var i = 0; i < size; i ++)
              {
                if (data [4][i].identifier == data [0][0].investigationLine)
                {
                  investigationLineOptions += "<option value = '" + data [4][i].identifier + "' selected>" + data [4][i].name + "</option>"
                }
                else
                {
                  investigationLineOptions += "<option value = '" + data [4][i].identifier + "'>" + data [4][i].name + "</option>"
                }
              }

              $("select[name=investigationLine]").append (investigationLineOptions);
              var authorFields = "";

              for (var i = 1; i <= 3; i ++)
              {
                authorFields += "<div class = 'col-xs-12 col-sm-12 col-md-12 col-lg-12 div-select'>" +
                                   "<select class = 'form-control' multiple = 'multiple' name = 'author-" + i + "'" +
                                   "</select></div>";
              }

              $("#project-2 > .main").append (authorFields);
              var authorOptions = "<option value = '0'>Choose an author</option>";
              size = data [2].length;
              authorsSize = data [1].length;
              var check = false;

              for (var i = 0; i < size; i ++)
              {
                check = false;

                for (var j = 0; j < authorsSize; j++)
                {
                    if (data [2][i].identifier == data [1][j].identifier)
                    {
                      authorOptions += "<option value = '" + data [2][i].identifier + "' selected>" + data [2][i].name + " " + data [2][i].lastName + "</option>"
                      check = true;
                      break;
                    }
                }

                if (!check)
                {
                  authorOptions += "<option value = '" + data [2][i].identifier + "'>" + data [2][i].name + " " + data [2][i].lastName + "</option>"
                }
              }
            },

            error: function (data)
            {
              console.log ("Package unsent");
            }
          });
        }
        else
        {
          console.log ("Nothing");
          window.location.href = "update-projects.php";
        }
      },

      error: function (data)
      {
        console.log ("Package unsent");
        console.log (data);
      }
    });
    /*$("form[name=add-project-form]").submit
    (
      function (event)
      {
        if ($("#authorsSelect option:selected").length <= 3 && $("#authorsSelect option:selected").length >= 1 && $("select[name=advisers]").val () != 0)
        {
          $.ajax
          ({
            type: "post",
            url: "../controllers/add-project.php",
            data: $("form[name=add-project-form]").serialize (),
            encode: true,
            success: function (data)
            {
              console.log ("Package sent");
              console.log (data);
              $("form[name=add-project-form]") [0].reset ();
              alert ("Project added.");
              $(".container").slideUp
              (
                500, function ()
                {
                  window.location.href = "../views/add-project.php";
                }
              );
            },
            error: function (data)
            {
              console.log ("Package unsent");
            }
          });
        }
        else
        {
            if ($("#authorsSelect option:selected").length > 3 || $("#authorsSelect option:selected").length < 1)
            {
              for(i = 0; i < 3; i ++)
              {
                $("#authorsSelect").fadeTo ('slow', 0.1).fadeTo ('slow', 1.0);
              }
            }
            if ($("select[name=advisers]").val () == 0)
            {
              for(i = 0; i < 3; i ++)
              {
                $("select[name=advisers]").fadeTo ('slow', 0.1).fadeTo ('slow', 1.0);
              }
            }
        }

        event.preventDefault ();
      }
    );

    $("input[name=back-2]").click
    (
      function ()
      {
        $("#project-2").fadeOut
        (
          500, function ()
          {
            $("#project-1").fadeIn (500);
          }
        );
      }
    );

    $("input[name=accept]").click
    (
      function ()
      {
        if ($("input[name=name]").val () != null && $("input[name=name]").val () != "" &&
        $("select[name=investigationLine]").val () != 0)
        {
          $("#project-1").fadeOut
          (
            500, function ()
            {
              $("#project-2").fadeIn (500);
            }
          );
        }
        else
        {
          if ($("input[name=name]").val () == null || $("input[name=name]").val () == "")
          {
            for(i = 0; i < 3; i ++)
            {
              $("input[name=name]").fadeTo ('slow', 0.1).fadeTo ('slow', 1.0);
            }
          }
          if ($("select[name=investigationLine]").val () == 0)
          {
            for(i = 0; i < 3; i ++)
            {
              $("select[name=investigationLine]").fadeTo ('slow', 0.1).fadeTo ('slow', 1.0);
            }
          }
        }
      }
    );*/
  }
);
