let selectLowongan = document.getElementById('selectLowongan');
let pilihanLowongan = [
    { nama: 'Database administrator', kuota: 3 },
    { nama: 'Backend Developer', kuota: 2 },
    { nama: 'Frontend Developer', kuota: 0 },
    { nama: 'System administrator', kuota: 4 },
    { nama: 'UI/UX', kuota: 1 }];
let disabled = document.createElement('option');
disabled.textContent = '-pilih-';
disabled.disabled=true;
disabled.selected=true;
disabled.id='pilih'
selectLowongan.appendChild(disabled);
// document.getElementById('counter-lowongan').innerHTML = `pilihan yang di disable kuota sudah penuh`
// document.getElementById('counter-lowongan').style.color = 'green';
for (let i = 0; i < pilihanLowongan.length; i++) {
    const pilih = pilihanLowongan[i].nama ;
    let option = document.createElement('option');
    // if (pilihanLowongan[i].kuota == 0) {
    //     option.disabled = true;
    // }
    option.textContent = pilih;
    option.value = pilih;
    option.id = pilih;
    selectLowongan.appendChild(option);
}
let selectPosisi = document.getElementById('selectPosisi');
let pilihanPosisi = ['Jakarta', 'Bogor', 'Bandung'];
for (let i = 0; i < pilihanPosisi.length; i++) {
    const pilih = pilihanPosisi[i];
    let option = document.createElement('option');
    option.textContent = pilih;
    option.value = pilih;
    selectPosisi.appendChild(option);
}
let submit = 0
let data = []
let objek = {};
let data_email = []
function myLowongan() {
    // console.log(selectLowongan.value);
    // document.getElementById('counter-lowongan').innerHTML = `${selectLowongan.value}`
    const filteredItems = pilihanLowongan.filter((item) => {
        return item.nama.includes(selectLowongan.value);
    });
    // console.log(filteredItems);
    if (filteredItems[0].kuota===0) {
        document.getElementById(filteredItems[0].nama).disabled=true;
        document.getElementById('counter-lowongan').innerHTML = `Mohon maaf, rekrutasi untuk ${filteredItems[0].nama} sudah penuh. dan tidak dapat dipilih`
        document.getElementById('counter-lowongan').style.color = 'red';
    } else if (filteredItems[0].kuota <= 2){
        document.getElementById('counter-lowongan').innerHTML = `kuota tersisa untuk ${filteredItems[0].nama} hanya ${filteredItems[0].kuota} pendaftar`
        document.getElementById('counter-lowongan').style.color = 'red';
       
    }else {
        document.getElementById('counter-lowongan').innerHTML = `Anda dapat memilih lowongan ${filteredItems[0].nama}`
        document.getElementById('counter-lowongan').style.color = 'green';
    }
}


function kirim(e) {
    e.preventDefault();
    let id = submit + 1;
    let fullname = document.getElementById("form").fullname.value;
    let email = document.getElementById("form").email.value;
    let nomor = document.getElementById("form").nomor.value;
    let lowongan = document.getElementById("form").lowongan.value;
    let posisi = document.getElementById("form").posisi.value;
    if (fullname === '') {
        document.getElementById('counter-fullname').innerHTML = 'wajib di isi'
    } else if (email === '') {
        document.getElementById('counter-email').innerHTML = 'wajib di isi'
    } else if (nomor === '') {
        document.getElementById('counter-nomor').innerHTML = 'wajib di isi'
    } else if (data_email.includes(email)) {
        document.getElementById('counter-email').innerHTML = 'Email sudah ada'
    }else {
        const indexLow=pilihanLowongan.findIndex((obj => obj.nama == lowongan));
        pilihanLowongan[indexLow].kuota--;
        document.getElementById('counter-fullname').innerHTML = ''
        document.getElementById('counter-email').innerHTML = ''
        document.getElementById('counter-nomor').innerHTML = ''
        document.getElementById('counter-lowongan').innerHTML = ''
        document.getElementById("pilih").selected = true;
        document.getElementById('fullname').innerHTML = fullname;
        document.getElementById('email').innerHTML = email;
        document.getElementById('nomor').innerHTML = nomor;
        document.getElementById('lowongan').innerHTML = lowongan;
        document.getElementById('posisi').innerHTML = posisi;
        document.getElementById('title').style.color = 'green';
        document.getElementById('title').innerHTML = `Terima kasih telah melakukan pengisian data, anda adalah yang ke ${id}`;
        objek={
            id:id,
            fullname:fullname,
            email:email,
            nomor:nomor,
            lowongan:lowongan,
            posisi:posisi
        }
        data.push(objek);
        console.log(data);
        data_email.push(data[submit].email);
        submit++;
    }
}