(function () {
    var input_data = {};
    var inputed_elements = 0;
    var inp = document.getElementById("inp");
    var btn = document.getElementById("btn");
    var result = document.getElementById("result");

    btn.onclick = function () {
        var data = inp.value + ' ';
        var sec = document.createElement('section');
        var p = document.createElement('p');
        var text = document.createTextNode(data);
        p.appendChild(text);
        var bt = document.createElement('button');
        var dt = document.createTextNode("DELETE NOTE");
        bt.appendChild(dt);
        // bt.setAttribute("id", `id_${inputed_elements}`);
        bt.addEventListener("click", function () {
            delete input_data[$(this).parent().attr("id")];
            $(this).parent().remove();
            // console.log($(this).parent().attr("id"));
            // console.log(input_data);
        });
        p.setAttribute("contentEditable", "true");
        p.addEventListener("click", function () {
            if ($('#update').length > 0) {
                // it exists 
                console.log("exists");
                alert("first update the previous text");
            }
            else {
                var up = document.createElement('button');
                var ut = document.createTextNode("UPDATE NOTE");
                up.appendChild(ut);
                up.setAttribute("id", "update");
                up.addEventListener("click", function () {
                    // console.log("yes it will work");
                    var temp = $(this).parent().children().first().text();
                    // console.log($(this).parent().children().first());
                    // console.log(temp);
                    // console.log($(this).parent().attr("id"));
                    input_data[$(this).parent().attr("id")] = temp;
                    console.log(input_data);
                    $(this).remove();
                });
                $(this).parent().append(up);
                // console.log($(this));
            }
        })
        sec.setAttribute("id", `id_${inputed_elements}`);
        sec.appendChild(p);
        sec.appendChild(bt);
        $(result).prepend(sec);
        // input_data.push(data);
        input_data[`id_${inputed_elements}`] = data;
        // console.log(input_data);
        inputed_elements = inputed_elements + 1;
    }


})();