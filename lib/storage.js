 
 const Store = require('electron-store');
 
 const store = new Store();
 
 
 if (store.has('window.wd'))
 {window.wd=store.get('window.wd')
	 getLocalVer(entry);
}
 else{
	 preEntry();
}

function clearCache(){
	store.delete('window.wd')
}
