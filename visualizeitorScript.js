var optativasMaterias=[];
var TG = ["",""];
var xml=null;
var numVer="";


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


function findPosition(opt){
    var i;
    for(i=0;i<opt.length;i++){
        if(opt[i]=="Reprovado por nota" || opt[i]=="Reprovado por Frequência")
            return i;
    }
    for(i=0;i<opt.length;i++){
        if(opt[i]=="" )
            return i;
    }
    
    return i;
}

function saveHtml(opt,numVer){
    var i;
    for(i=0;i<opt.length;i++){
        if(opt[i]=="Aprovado"){
            var element=document.getElementById("OPT"+(i+1).toString()+numVer);
            if(element!=null)
                element.style.background="#00913D";
        }
        else if(opt[i]=="Reprovado por nota" || opt[i]=="Reprovado por Frequência" ){
            var element=document.getElementById("OPT"+(i+1).toString()+numVer);
            if(element!=null)
                element.style.background="#C2000D";
        }
        else if (opt[i]=="Equivalência de Disciplina" || opt[i]=="Dispensa de Disciplinas (com nota)"){
            var element=document.getElementById("OPT"+(i+1).toString()+numVer);
            if(element!=null)
                element.style.background="#E6E61A";
        }
        else if (opt[i]=="Matrícula"){
            var element=document.getElementById("OPT"+(i+1).toString()+numVer);
            if(element!=null)
                element.style.background="#0075C9";
        }
    }
}



function xmlMicoxArvore(xmlNode,identacao,grr,opt,optB){
    var arvoreTxt=""; //esta var armazenara o conteudo
    endGrr=true;
    var i=0;
    while(endGrr && i<xmlNode.childNodes.length )
    {//percorrendo os filhos do nó
        if(xmlNode.childNodes[i].nodeType == 1){//ignorar espaços em branco
            //pegando o nome do nó
            
            if(xmlNode.childNodes[i].childNodes.length==0){
            //se não tiver filhos eu já pego o nodevalue

                for(var z=0;z<xmlNode.childNodes[i].attributes.length;z++){
                    var atrib = xmlNode.childNodes[i].attributes[z];
                }
            }
            else if(xmlNode.childNodes[i].childNodes.length>0){

                //se tiver filhos eu tenho que pegar o valor pegando o valor do primeiro filho
                if(xmlNode.childNodes[i].nodeName=="MATR_ALUNO" && xmlNode.childNodes[i].firstChild.nodeValue!=grr.value){
                    //arvoreTxt=arvoreTxt + "GRR:"+string(grr.value);
                    endGrr=false;
                    break;
                }
                else if(xmlNode.childNodes[i].nodeName=="SITUACAO"){
                    status=xmlNode.childNodes[i].firstChild.nodeValue
                }
                else if(xmlNode.childNodes[i].nodeName=="COD_ATIV_CURRIC"){
                    materia=xmlNode.childNodes[i].firstChild.nodeValue;
                    
                }
                else if (xmlNode.childNodes[i].nodeName=="NUM_VERSAO"){
                    
                    if(xmlNode.childNodes[i].firstChild.nodeValue=="1998")
                        numVer="B"
                    else
                        numVer=""
                }
                else if (xmlNode.childNodes[i].nodeName=="DESCR_ESTRUTURA"){
                    
                    if(status=="Aprovado"){
                        document.getElementById("demo").innerHTML=xmlNode.childNodes[i].firstChild.nodeValue;
                        if(numVer=="B")
                            var element=document.getElementById(materia+"B");
                        else
                            var element=document.getElementById(materia+"");
                        if(element!=null)
                            element.style.background="#00913D";
                        else if(materia!=null){
                            if(xmlNode.childNodes[i].firstChild.nodeValue=="Optativas"){
                                var find=findPosition(opt);
                                if(find<9){
                                    opt[find]=status;
                                    optativas[find]=materia;
                                }
                                /*opt.push(status);
                                if(numVer=="B"){
                                    while(find ){
                                    
                                        find=saveOPT("B",opt,materia,"#00913D");
                                        k++;
                                    }
                                }
                                else{
                                    while(find ){
                                        find=saveOPT("",opt,materia,"#00913D");
                                        k++;
                                    }
                                }*/
                            }
                        }
                    }
                    else if (status=="Reprovado por nota" || status=="Reprovado por Frequência"){
                        document.getElementById("demo").innerHTML=xmlNode.childNodes[i].firstChild.nodeValue;
                        if(numVer=="B")
                            var element=document.getElementById(materia+"B");
                        else
                            var element=document.getElementById(materia+"");
                        if(element!=null)
                            element.style.background="#C2000D";
                        else if(materia!=null){
                            if(xmlNode.childNodes[i].firstChild.nodeValue=="Optativas"){
                                var find=findPosition(opt);
                                if(find<9){
                                    opt[find]=status;
                                    optativas[find]=materia;
                                }
                            }
                        }

                    }
                    else if (status=="Equivalência de Disciplina" || status=="Dispensa de Disciplinas (com nota)"){
                        document.getElementById("demo").innerHTML=xmlNode.childNodes[i].firstChild.nodeValue;
                        if(numVer=="B")
                            var element=document.getElementById(materia+"B");
                        else
                            var element=document.getElementById(materia+"");
                        if(element!=null)
                            element.style.background="#E6E61A";
                        else if(materia!=null){
                            if(xmlNode.childNodes[i].firstChild.nodeValue=="Optativas"){
                                var find=findPosition(opt);
                                 if(find<9){
                                    opt[find]=status;
                                    optativas[find]=materia;
                                }
                            }
                        }

                    }
                    else if (status=="Matrícula"){
                        document.getElementById("demo").innerHTML=xmlNode.childNodes[i].firstChild.nodeValue;
                        if(numVer=="B")
                            var element=document.getElementById(materia+"B");
                        else
                            var element=document.getElementById(materia+"");
                        if(element!=null)
                            element.style.background="#0075C9";
                        else if(materia!=null){
                            if(xmlNode.childNodes[i].firstChild.nodeValue=="Optativas"){
                                var find=findPosition(opt);
                                if(find<9){
                                    opt[find]=status;
                                    optativas[find]=materia;
                                }
                            }
                        }

                    }

                }

                
            //recursividade para carregas os filhos dos filhos
                xmlMicoxArvore(xmlNode.childNodes[i],identacao,grr,opt);
            }
            
        }
        i++
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

	if(aluno[0].childNodes[13].firstChild.nodeValue=="1998"){
		document.getElementById("1998").style.visibility="visible";
        	document.getElementById("2011").style.visibility="hidden";
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

function findMateria(aluno){
    var vers;
    var materia;
    var estrutura;
    var status;
	var optativas = [];
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
			optativasMaterias.push(materia);
		}

    }
	if(vers=="B"){
		if(optativas.length < 9){
			for(i=1;i<=optativas.length;i++){
				var element=document.getElementById("OPT"+i.toString()+"B");
				if(element!=null){
					if(optativas[i]=="Aprovado")
						element.style.background="#00913D";
					else if((optativas[i]=="Reprovado por nota" || optativas[i]=="Reprovado por Frequência"))
						element.style.background="#C2000D";
					else if((optativas[i]=="Equivalência de Disciplina" || optativas[i]=="Dispensa de Disciplinas (com nota)"))
						element.style.background="#E6E61A";
					else if(optativas[i]=="Matrícula")
						element.style.background="#0075C9";
				}
			}
		}
		else{
			var cont=optativas.length -1 ;
			var k=0;
			var i=0;
			while(k<9 && i<optativas.length){
				var element=document.getElementById("OPT"+(k+1).toString()+"B");
				if(element!=null){
						if(optativas[i]=="Aprovado"){
							element.style.background="#00913D";
							k++;
						}
						else if((optativas[i]=="Equivalência de Disciplina" || optativas[i]=="Dispensa de Disciplinas (com nota)")){
							element.style.background="#E6E61A";
							k++;
						}
						else if(optativas[i]=="Matrícula"){
							element.style.background="#0075C9";
							k++;
						}
						
					
				}
				i++
			}
			if(k<8){
				var find=true;
				for(i=k; i< 9;i++){
					var element=document.getElementById("OPT"+i.toString()+"B");
					if(element!=null){
						if((optativas[cont]=="Reprovado por nota" || optativas[cont]=="Reprovado por Frequência")){
							element.style.background="#C2000D";
						}
						cont--;
					}
				}
			}
		}
			
					
	
	}
	
}

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
        
        var opt= ["","","","","","","","",""];
        var aluno=[];
        if(xml==null)
            xml=xmlMicoxLoader("alunos.xml");
        getAluno(xml,grr,aluno);
		arrumarTabela(aluno);
        findMateria(aluno);
        //xmlMicoxArvore(xml,"",grr,opt);
        //saveHtml(opt,numVer);
    	return true;

    }


}
