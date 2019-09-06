const button = document.querySelector("#instantly");
const carregando = document.querySelector("#load");

data = new Date;
dataAtual = data.getFullYear()+"-"+(data.getMonth()+1)+"-"+data.getDate();

const noticiasAjax = function(){
	let buscar = document.querySelector("#search").value;
	let chave = "6fc93a5ead4a46588e4453971f62c214";
	let noticia = document.querySelector("#instantly-news");
	let noticias = document.querySelector(".container");

	let ajax = new XMLHttpRequest();
	ajax.onreadystatechange = function(){
		if(this.readyState == 4 && this.status == 200){
			carregando.style.display = "none";
			noticia.className = "";

			let resposta = JSON.parse(this.responseText);
				for(let i=0; i<20; i++){
					str = resposta.articles[i].publishedAt
					ano = str.substring(0, 4);
					mes = str.substring(5, 7);
					dia = str.substring(8, 10);
					str = (dia+"-"+mes+"-"+ano);

					noticias.innerHTML += "<article class='instantly-news clearfix'><h1>"+resposta.articles[i].title+"</h1><div class='instantly-resume'>"+resposta.articles[i].description+"</div><div class='instantly-image'><img class='imagem' src='"+resposta.articles[i].urlToImage+"'></div><div class='instantly-details cf'><a href='"+resposta.articles[i].url+"' class='link'>Veja notícia completa</a><span class='data'>Publicado em <strong>"+str+"</strong></span></div></article>";
				}
		}else{
			noticias.innerHTML = "";
			carregando.style.display = "block";
		}	
	}
	ajax.open("GET", "https://newsapi.org/v2/everything?q="+buscar+"&from="+dataAtual+"&sortBy=publishedAt&apiKey="+chave, true)
	ajax.send();
}

button.onclick = noticiasAjax;