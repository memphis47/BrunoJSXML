var optativasMaterias=[];
var tg1;
var tg2;
var xml=null;
var numVer="";
var aluno=[];


function xmlMicoxLoader(url){
    if(window.XMLHttpRequest){
        var Loader = new XMLHttpRequest();
        Loader.open("GET", url ,false);
        Loader.send(null);
        return Loader.responseXML;
    }
    else if(window.ActiveXObject){
        var Loader = new ActiveXObject("Msxml2.DOMDocument.3.0");
        Loader.async = false;
        Loader.load(url);
        return Loader;
    }
}





function getLastTime(materia){
    var materiaAluno=["","","","",""];
    for(i=0;i<aluno.length;i++){
        if(aluno[i].childNodes[29].firstChild.nodeValue==materia){
            materiaAluno[0]=aluno[i].childNodes[29].firstChild.nodeValue; //codigo materia
            materiaAluno[1]=aluno[i].childNodes[31].firstChild.nodeValue; // nome materia
            materiaAluno[2]=aluno[i].childNodes[19].firstChild.nodeValue; // ano
            materiaAluno[3]=aluno[i].childNodes[21].firstChild.nodeValue; // nota
            materiaAluno[4]=aluno[i].childNodes[47].firstChild.nodeValue; // freq
        }
    }
    return materiaAluno;
}

function lerHistorico(materia){
    var materiaHistorico=[];
    for(i=0;i<aluno.length;i++){
        if(aluno[i].childNodes[29].firstChild.nodeValue==materia){
            materiaHistorico.push(aluno[i]);
        }
    }
    return materiaHistorico;
}


function mostrarMateria(obj,event){
    var materia;
    var text=["Código: ","Nome: ","Ano: ","Nota: ","Frequencia: "]
    if(event.button == 0){    
        if(obj.innerHTML.indexOf("OPT") > -1){
            var split = obj.innerHTML.split("OPT");
            var number = parseInt(split[1]);
            materia=getLastTime(optativasMaterias[number-1]);
            for(i=0;i<materia.length;i++)
                text[i]=text[i]+materia[i];
            alert(text.join("\n"));
        }
        else if(obj.innerHTML=="TG I"){
            materia=getLastTime(tg1);
            for(i=0;i<materia.length;i++)
                text[i]=text[i]+materia[i];
            alert(text.join("\n"));
        }
        else if(obj.innerHTML=="TG II"){
            materia=getLastTime(tg2);
            for(i=0;i<materia.length;i++)
                text[i]=text[i]+materia[i];
            alert(text.join("\n"));
        }
        else{
            materia=getLastTime(obj.innerHTML);
            for(i=0;i<materia.length;i++)
                text[i]=text[i]+materia[i];
            alert(text.join("\n"));
        }
    }
    else if(event.button == 2){
        var matriz=[];
        if(obj.innerHTML.indexOf("OPT") > -1){
            var split = obj.innerHTML.split("OPT");
            var number = parseInt(split[1]);
            var hist=lerHistorico(optativasMaterias[number-1]);
            if(hist.length>0){
                matriz.push("Materia: "+ hist[0].childNodes[31].firstChild.nodeValue);
                matriz.push("Código: "+ hist[0].childNodes[29].firstChild.nodeValue);
                matriz.push("            ");
                for(i=0;i<hist.length;i++){
                        matriz.push(text[2]+hist[i].childNodes[19].firstChild.nodeValue); // ano
                        matriz.push(text[3]+hist[i].childNodes[21].firstChild.nodeValue); // nota
                        matriz.push(text[4]+hist[i].childNodes[47].firstChild.nodeValue); // freq
                        matriz.push("            ");
                }
                alert(matriz.join("\n"));
            }
            else
                alert("Materia sem histórico disponivel");
        }
        else if(obj.innerHTML=="TG I"){
            var hist=lerHistorico(tg1);
            if(hist.length>0){
                matriz.push("Materia: "+ hist[0].childNodes[31].firstChild.nodeValue);
                matriz.push("Código: "+ hist[0].childNodes[29].firstChild.nodeValue);
                matriz.push("            ");
                for(i=0;i<hist.length;i++){
                        matriz.push(text[2]+hist[i].childNodes[19].firstChild.nodeValue); // ano
                        matriz.push(text[3]+hist[i].childNodes[21].firstChild.nodeValue); // nota
                        matriz.push(text[4]+hist[i].childNodes[47].firstChild.nodeValue); // freq
                        matriz.push("            ");
                }
                alert(matriz.join("\n"));
            }
            else
                alert("Materia sem histórico disponivel");
        }
        else if(obj.innerHTML=="TG II"){
            var hist=lerHistorico(tg2);
            if(hist.length>0){
                matriz.push("Materia: "+ hist[0].childNodes[31].firstChild.nodeValue);
                matriz.push("Código: "+ hist[0].childNodes[29].firstChild.nodeValue);
                matriz.push("            ");
                for(i=0;i<hist.length;i++){
                        matriz.push(text[2]+hist[i].childNodes[19].firstChild.nodeValue); // ano
                        matriz.push(text[3]+hist[i].childNodes[21].firstChild.nodeValue); // nota
                        matriz.push(text[4]+hist[i].childNodes[47].firstChild.nodeValue); // freq
                        matriz.push("            ");
                }
                alert(matriz.join("\n"));
            }
            else
                alert("Materia sem histórico disponivel");
        }
        else{
            var hist=lerHistorico(obj.innerHTML);
            if(hist.length>0){
                matriz.push("Materia: "+ hist[0].childNodes[31].firstChild.nodeValue);
                matriz.push("Código: "+ hist[0].childNodes[29].firstChild.nodeValue);
                matriz.push("            ");
                for(i=0;i<hist.length;i++){
                        matriz.push(text[2]+hist[i].childNodes[19].firstChild.nodeValue); // ano
                        matriz.push(text[3]+hist[i].childNodes[21].firstChild.nodeValue); // nota
                        matriz.push(text[4]+hist[i].childNodes[47].firstChild.nodeValue); // freq
                        matriz.push("            ");
                }
                alert(matriz.join("\n"));
            }
            else
                alert("Materia sem histórico disponivel");
        }
    }
}

function getAluno(xml,grr,aluno){
    var alunos=xml.getElementsByTagName("ALUNO");
    for(i=0;i<alunos.length;i++){
        if(alunos[i].childNodes[3].firstChild.nodeValue==grr.value)
            aluno.push(alunos[i]);
    }
}

function setMateria(vers,materia,cor){
    var element=document.getElementById(materia+vers);
    if(element!=null)
        element.style.background=cor;
}

function setOutro(ind,vers,materia,cor){
	var opc="opc"+(ind.toString())+vers;
    var element = document.getElementById(opc);
	element.innerHTML=materia;
	if(element!=null)
        element.style.background=cor;
    
}

function arrumarTabela(aluno){
	var opc;
	var vers;
    tg1=null;
    tg2=null;
    optativasMaterias=[];
	if(aluno[0].childNodes[13].firstChild.nodeValue=="1998"){
		document.getElementById("1998").style.visibility="visible";
        document.getElementById("2011").style.visibility="hidden";
        document.getElementById("1998").style.marginTop="-14.9%";
        vers="B";
    }
	else{
		document.getElementById("2011").style.visibility="visible";
        document.getElementById("1998").style.visibility="hidden";
        vers="";
	}
    if(vers=="B"){
	        var materias = document.getElementsByClassName("materiasB");
	        var materiasCinzas = document.getElementsByClassName("materiasB1");
	}
    else{
	        var materias = document.getElementsByClassName("materiasA");
	        var materiasCinzas = document.getElementsByClassName("materiasA1");
    	}

    	for(i=0;i<materias.length;i++){
        
        	materias[i].style.background="";
        	materias[i].style.border="1px solid black";
    	}
    	for(i=0;i<materiasCinzas.length;i++){
        	materiasCinzas[i].style.background="#CCCCCC";
        	materiasCinzas[i].style.border="1px solid black";
    	}
	for(i=1;i<9;i++){
		opc="opc"+(i.toString())+vers;
		var element = document.getElementById(opc);
        	if(element==null)
            		return;
		element.innerHTML="-";
		element.style.background="";
	}
}

function arrumarOptativas(optativas,optativasMat,tam){
    var cont=optativas.length -1 ;
    var k=0;
    var i=0;
    while(k<tam && i<optativas.length){
        var element=document.getElementById("OPT"+(k+1).toString()+"B");
        if(element!=null){
            if(optativas[i]=="Aprovado"){
                element.style.background="#00913D";
                k++;
                optativasMaterias.push(optativasMat[i]); 
            }
            else if((optativas[i]=="Equivalência de Disciplina" || optativas[i]=="Dispensa de Disciplinas (com nota)")){
                element.style.background="#E6E61A";
                k++;
                optativasMaterias.push(optativasMat[i]); 
            }
            else if(optativas[i]=="Matrícula"){
                element.style.background="#0075C9";
                k++;
                optativasMaterias.push(optativasMat[i]); 
            }
                       
            
        }
        i++
    }
    if(k<tam){
        var find=true;
        for(i=k; i< tam;i++){
            var element=document.getElementById("OPT"+i.toString()+"B");
            if(element!=null){
                if((optativas[cont]=="Reprovado por nota" || optativas[cont]=="Reprovado por Frequência")){
                    element.style.background="#C2000D";
                    optativasMaterias.push(optativasMat[i]);
                }
                cont--;
                
            }
        }
    }
}

function findMateria(aluno){
    var vers;
    var materia;
    var estrutura;
    var status;
	var optativas = [];
    var optativasMat = [];
    var tg1M;
    var tg2M;
    if(aluno[0].childNodes[13].firstChild.nodeValue=="1998")
        vers="B";
    else
        vers="";
	ind=1;
	opt=0;
    for(i=0;i<aluno.length;i++){
        materia=aluno[i].childNodes[29].firstChild.nodeValue;
        estrutura=aluno[i].childNodes[45].firstChild.nodeValue;
        status=aluno[i].childNodes[27].firstChild.nodeValue;
		if(estrutura=="Obrigatórias"){
			if(status=="Aprovado")
				setMateria(vers,materia,"#00913D");
			else if((status=="Reprovado por nota" || status=="Reprovado por Frequência"))
				setMateria(vers,materia,"#C2000D");
			else if((status=="Equivalência de Disciplina" || status=="Dispensa de Disciplinas (com nota)"))
				setMateria(vers,materia,"#E6E61A");
			else if(status=="Matrícula")
				setMateria(vers,materia,"#0075C9");
		}
		else if(estrutura=="Disciplinas de outros cursos"){
			if(status=="Aprovado"){
				setOutro(ind,vers,materia,"#00913D");
				ind++;
			}
			else if((status=="Reprovado por nota" || status=="Reprovado por Frequência")){
				setOutro(ind,vers,materia,"#C2000D");
					ind++;
			}
			else if((status=="Equivalência de Disciplina" || status=="Dispensa de Disciplinas (com nota)")){
				setOutro(ind,vers,materia,"#E6E61A");
					ind++;
			}
			else if(status=="Matrícula"){
				setOutro(ind,vers,materia,"#0075C9");
				ind++;
			}
		}
		else if(estrutura=="Optativas"){
			optativas.push(status);
			optativasMat.push(materia);
		}
        else if(estrutura=="Trabalho de Graduação I"){
            if(status=="Aprovado")
                setMateria(vers,"TGI","#00913D");
            else if((status=="Reprovado por nota" || status=="Reprovado por Frequência"))
                setMateria(vers,"TGI","#C2000D");
            else if((status=="Equivalência de Disciplina" || status=="Dispensa de Disciplinas (com nota)"))
                setMateria(vers,"TGI","#E6E61A");
            else if(status=="Matrícula")
                setMateria(vers,"TGI","#0075C9");
            tg1M=materia;
        }
        else if(estrutura=="Trabalho de Graduação II"){
            if(status=="Aprovado")
                setMateria(vers,"TGII","#00913D");
            else if((status=="Reprovado por nota" || status=="Reprovado por Frequência"))
                setMateria(vers,"TGII","#C2000D");
            else if((status=="Equivalência de Disciplina" || status=="Dispensa de Disciplinas (com nota)"))
                setMateria(vers,"TGII","#E6E61A");
            else if(status=="Matrícula")
                setMateria(vers,"TGII","#0075C9");
            tg2M=materia;
        }

    }
	if(vers=="B"){
		if(optativas.length < 10){
            k=0;
			for(i=1;i<optativas.length;i++){
				var element=document.getElementById("OPT"+i.toString()+"B");
				if(element!=null){
					if(optativas[k]=="Aprovado")
						element.style.background="#00913D";
					else if((optativas[k]=="Reprovado por nota" || optativas[k]=="Reprovado por Frequência"))
						element.style.background="#C2000D";
					else if((optativas[k]=="Equivalência de Disciplina" || optativas[k]=="Dispensa de Disciplinas (com nota)"))
						element.style.background="#E6E61A";
					else if(optativas[k]=="Matrícula")
						element.style.background="#0075C9";
                    k++;
                    optativasMaterias.push(optativasMat[i]);
				}

			}
		}
		else{
			arrumarOptativas(optativas,optativasMat,9);
		}
	}
    else{
       if(optativas.length < 7){
            k=0;
            for(i=1;i<optativas.length;i++){
                var element=document.getElementById("OPT"+i.toString()+"B");
                if(element!=null){
                    if(optativas[k]=="Aprovado")
                        element.style.background="#00913D";
                    else if((optativas[k]=="Reprovado por nota" || optativas[k]=="Reprovado por Frequência"))
                        element.style.background="#C2000D";
                    else if((optativas[k]=="Equivalência de Disciplina" || optativas[k]=="Dispensa de Disciplinas (com nota)"))
                        element.style.background="#E6E61A";
                    else if(optativas[k]=="Matrícula")
                        element.style.background="#0075C9";
                    k++;
                    optativasMaterias.push(optativasMat[i]);
                }

            }
        }
        else{
            arrumarOptativas(optativas,optativasMat,6);
        } 
    }
    tg1=tg1M;
    tg2=tg2M;
	
}

function mostrarTabela(){
    aluno=[];
	var grr=document.getElementById("GRRAluno");
	if(grr.value=="" || grr.value==null || grr == null){
		document.getElementById("2011").style.visibility="hidden";
        document.getElementById("1998").style.visibility="hidden";
        alert("Você Não digitou nenhum GRR\n" +
          "Por favor digite um GRR");
    	grr.focus();
    	return false;
    }
    else{
		
    	document.getElementById("demo").innerHTML=grr.value;
        
        if(xml==null)
            xml=xmlMicoxLoader("alunos.xml");
        getAluno(xml,grr,aluno);
		arrumarTabela(aluno);
        findMateria(aluno);
    	return true;

    }


}



function stopRKey(evt) {
    var evt = (evt) ? evt : ((event) ? event : null);
    var node = (evt.target) ? evt.target : ((evt.srcElement) ? evt.srcElement : null);
    if ((evt.keyCode == 13) && (node.type=="text"))  {return false;}
}

document.onkeypress = stopRKey;