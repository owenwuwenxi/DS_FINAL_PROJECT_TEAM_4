var certificationApp = new Vue({
  el: '#certificationTable',
  data: {

    certList: [],

  newCertification: {
    certficationID: '',
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
  //delete method
  deleteCert(certificationID) {
    fetch('api/certifications/delete_cert.php',{
      method:'POST',
      body: JSON.stringify({"certificationID":certificationID}),
      headers:{
        "Content-Type": "application/json; charset=utf-8"
      }
    })
    .then( response => response.json() )
    .then( json => {
      this.certList = json;
      //do the right stuff here
  });
  },

  newCertificationData() {
    return {
      certficationID: '',
      certifyingAgency: '',
      certificationName: '',
      standardExpiry: ''
    }
  }
},
created(){
  this.fetchCertification();

  }
});
