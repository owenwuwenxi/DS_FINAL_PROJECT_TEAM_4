var certificationApp = new Vue({
  el: '#certificationTable',
  data: {
    certifications: [],
    
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
      this.certfications=json;
      console.log(this.certifications);
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
      this.certifications.push(json[0]);
      this.newCertification = this.newCertificationData();
    });
    console.log("Creating (POSTing)...!");
    console.log(this.newCertification);
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
