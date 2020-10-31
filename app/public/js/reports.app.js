var reportDetails = new Vue ({
  el: '#reports',
  data: {
    mbrList:[],
    certList: [],
    mcList:[],
    reports:{
      firstName:'',
      lastName:'',
      radioNumber:'',
      stationNumber:'',
      preferredEmail:'',
      memberID:'',
      certificationName: '',
      certifyingAgency: '',
      certificationID:'',
      renewedDate:'',
      expirationDate:'',
      expired:''
    }
},
methods:{
  fetchmember() {
    fetch('api/reports/index.php')
    .then( response => response.json())
    .then( json => {this.mbrList = json})
    },
    fetchMemberCertification() {
      fetch('api/reports/membCert_index.php')
      .then( response => response.json())
      .then( json => {this.mcList = json})
    },
    fetchCertification(){
      fetch('api/reports/cert_index.php')
      .then(response => response.json())
      .then(json => {this.certList=json})
      }
    },
    created() {
      this.fetchmember();
      this.fetchCertification();
      this.fetchMemberCertification();
    }
  });
