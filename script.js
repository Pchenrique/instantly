const button = document.querySelector("#instantly");
const carregando = document.querySelector("#load");

data = new Date;
dataAtual = data.getFullYear()+"-"+(data.getMonth()+1)+"-"+data.getDate();
let buscarCampo = document.querySelector("#search");

const noticiasAjax = function(){
	let buscar = document.querySelector("#search").value;
	let chave = "6fc93a5ead4a46588e4453971f62c214";
	let method = "GET";
	let url = "https://newsapi.org/v2/everything?q="+buscar+"&from="+dataAtual+"&sortBy=publishedAt&apiKey="+chave
	let noticia = document.querySelector("#instantly-news");
	let noticias = document.querySelector(".container");

	let ajax = new XMLHttpRequest();
	ajax.onreadystatechange = function(){
		noticias.innerHTML = "";
		noticia.className = "";

		if(this.readyState == 4 && this.status == 200){

			carregando.style.display = "none";
			noticia.className = "";

			let resposta = JSON.parse(this.responseText);
					for(let i=0; i<20; i++){
						let str = resposta.articles[i].publishedAt;
						let ano = str.substring(0, 4);
						let mes = str.substring(5, 7);
						let dia = str.substring(8, 10);
						str = (dia+"-"+mes+"-"+ano);
						
						noticias.innerHTML += "<article class='instantly-news clearfix'><h1>"+resposta.articles[i].title+"</h1><div class='instantly-resume'>"+resposta.articles[i].description+"</div><div class='instantly-image'><img class='imagem' src='"+resposta.articles[i].urlToImage+"'></div><div class='instantly-details cf'><a href='"+resposta.articles[i].url+"' class='link'>Veja notícia completa</a><span class='data'>Publicado em <strong>"+str+"</strong></span></div></article>";
					}
		}else if(this.readyState == 4 && this.status != 200){
			carregando.style.display = "none";
			noticia.className = ""
			noticias.innerHTML += "<h1 id='sem'>Nenhuma Noticia Encontrada</h1>";
		}	
	}
	ajax.open(method, url , true)
	
	ajax.onload = function(){
		console.log(`Conteudo carregado. Status ${ajax.status}`);
	};

	ajax.onerror = function(){
		alert("Ocoreu um erro recarregue a pagina!");
	};

	ajax.onprogress = function(e) {
		console.log("Carregando...");
		carregando.style.display = "block";
	};
	
	ajax.send();
}

button.onclick = noticiasAjax;
buscarCampo.onblur = noticiasAjax;