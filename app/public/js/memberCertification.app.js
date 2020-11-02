var mcApp = new Vue ({
  el: '#memberCertificationVue',
  data: {

    mcList:[],
    certList:[],
    mbrList:[],
    mbrNmcList:[],
    mbrView:"",
    mbrDetailView:false,
    certView:"",
    certDetailView:false,

    newMC:{
      memberID:'',
      certificationID:'',
      renewedDate:'',
      expirationDate:''
    },

    newCertification: {
      certificationID: '',
      certifyingAgency: '',
      certificationName: '',
      standardExpiry: ''
    },

    selectedMemberCert:{
      memberID:'',
      certificationID:'',
      renewedDate:'',
      expirationDate:''
    },

    selectedCert:{
      certificationID: '',
      certifyingAgency: '',
      certificationName: '',
      standardExpiry: ''
    }
  },


  methods:{
    fetchMemberCertification() {
      fetch('api/memberCertification/')
      .then( response => response.json() )
      .then( json => {
        this.mcList = json;
        console.log(this.mcList);
        for (var i = 0; i < mcList.length; i++) {
          mcList[i]
          if (expired==1) {
            expired="Expired"
          }
          else {
            expired="Not Expired"
          }
        }

      });
      },

    fetchCertification(){
          fetch('api/certifications/')
          .then(response => response.json())
          .then(json => {
            this.certList=json;
            console.log(this.certList);
          });
        },

    fetchmember() {
          fetch('api/member/')
          .then( response => response.json() )
          .then( json => {
            this.mbrList = json;
            console.log(this.mbrList);
          });
          },

     fetchmemberandcertification() {
            fetch('api/member/')
            .then( response => response.json() )
            .then( json => {
              this.mbrList = json;
              console.log(this.mbrList);
            });
            fetch('api/memberCertification/')
            .then( response => response.json() )
            .then( json => {
              this.mcList = json;
              console.log(this.mcList);
            });
            fetch('api/certifications/')
            .then(response => response.json())
            .then(json => {
              this.certList = json;
              console.log(this.certList);
            });
            },

      createMemberCertification(){
        fetch('api/memberCertification/create.php',{
          method:'POST',
          body: JSON.stringify(this.selectedMemberCert),
          headers:{
            "Content-Type": "application/json; charset=utf-8"
          }
        })
        .then( response => response.json() )
        .then( json => {
          console.log("Returned from post:", json);
          this.mcList = json;
          this.newMC = this.newMCData();
      });
      console.log("Creating (POSTing)...!");
      console.log(this.selectedMemberCert);
    },

    editCertification(){
      fetch('api/certifications/update_cert.php', {
        method: 'POST',
        body: JSON.stringify(this.newCertification),
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        }
      })
      .then( response => response.json() )
      .then( json => {
        console.log("Returned from post:", json);
        this.certList = json;
        this.newCertification = this.newCertificationData();
      });
      console.log("Creating (POSTing)...!");
      console.log(this.newCertification);
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
        this.certList = json;
        this.newCertification = this.newCertificationData();
      });
      console.log("Creating (POSTing)...!");
      console.log(this.newCertification);
    },


    deleteMC(mcID) {
      fetch('api/memberCertification/delete.php',{
        method:'POST',
        body: JSON.stringify({"mcID":mcID}),
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

    deleteMbr(memberID) {
          fetch('api/member/delete.php',{
            method:'POST',
            body: JSON.stringify({"memberID":memberID}),
            headers:{
              "Content-Type": "application/json; charset=utf-8"
            }
          })
          .then( response => response.json() )
          .then( json => {
            this.mbrList = json;
            //do the right stuff here
        });
    },

    newMCData(){
      return {
        memberID:'',
        certificationID:'',
        renewedDate:'',
        expirationDate:'',
        expired:''
      }
    },

    newCertificationData() {
      return {
        certificationID: '',
        certifyingAgency: '',
        certificationName: '',
        standardExpiry: ''
      }
    },

    viewMbrDetail(memberID){
      this.mbrView=memberID;
      this.mbrDetailView=true;
    },

    viewCertDetail(certificationID){
      this.certView=certificationID;
      this.certDetailView=true;
    },

    addMemberCert(){

    },

  activeCert(){

  },

},

      created() {
        this.fetchmemberandcertification();

        // this.fetchMemberCertification();
      }
    });
