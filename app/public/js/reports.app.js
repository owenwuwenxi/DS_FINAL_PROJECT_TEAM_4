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
  })

  function myFunction() {
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("reportsTableBody");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[2];
      if (td) {
        txtValue = td.textContent || td.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      }
    }
  };
