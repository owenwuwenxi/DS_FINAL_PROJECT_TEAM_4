var certificationApp = new Vue({
  el: '#certificationTable',
  data: {

    certList: [],

  newCertification: {
    certificationID: '',
    certifyingAgency: '',
    certificationName: '',
    standardExpiry: ''
  }

},
methods: {
  fetchCertification(){
    fetch('api/certifications/')
    .then(response => response.json())
    .then(json => {
      this.certList=json;
      console.log(this.certList);
    });
  },
  createCertification(){
    fetch('api/certifications/create_cert.php', {
      method: 'POST',
      body: JSON.stringify(this.newCertification),
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      }
    })
    .then( response => response.json() )
    .then( json => {
      console.log("Returned from post:", json);
      this.certList.push(json[0]);
      this.newCertification = this.newCertificationData();
    });
    console.log("Creating (POSTing)...!");
    console.log(this.newCertification);
  },

  //delete mc Certifications
  deleteMC(mcID) {
    fetch('api/memberCertification/delete.php',{
      method:'POST',
      body: JSON.stringify({"certificationID":certificationID}),
      headers:{
        "Content-Type": "application/json; charset=utf-8"
      }
    })
    .then( response => response.json() )
    .then( json => {
      this.mcList = json;
      //do the right stuff here
  });
  },
  //edit Certifications


  //delete certification method
  deleteCert(certificationID) {
    fetch('api/certifications/delete_cert.php',{
      method:'POST',
      body: JSON.stringify({"certificationID":certificationID}),
      headers:{
        "Content-Type": "application/json; charset=utf-8"
      }
    })
    .then( response => {
      if(response.status == 409 ){
        alert("A member has this certification. Please delete the member's certification first.");
        return Promise.reject(new Error('Invalid Delete'));
      }
      return response.json() })
    .then( json => {
      this.certList = json;
      //do the right stuff here
    })

  },
//edit certification methods

  viewDetail(certificationID){

  },

  newCertificationData() {
    return {
      certificationID: '',
      certifyingAgency: '',
      certificationName: '',
      standardExpiry: ''
    }
  },
  activeCert(){

  }
},

  created(){
    this.fetchCertification();

    }
  });
