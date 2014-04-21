function sayHello(){
	var grr=document.getElementById("GRRAluno");
	if(grr.value=="" || grr.value==null || grr == null){
		document.getElementById("teste").style.visibility="hidden";
        alert("Você Não digitou nenhum GRR\n" +
          "Por favor digite um GRR");
    	grr.focus();
    	return false;
    }
    else{
    	document.getElementById("demo").innerHTML=grr.value;
        document.getElementById("teste").style.visibility="visible";

    	return true;

    }


}