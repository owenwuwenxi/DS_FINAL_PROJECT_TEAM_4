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

    selectedCert:{
      certificationID: '',
      certifyingAgency: '',
      certificationName: '',
      standardExpiry: ''
    },
    newMbr:{
      memberID: '',
      firstName:'',
      lastName:'',
      radioNumber:'',
      stationNumber:'',
      isActive: '',
      address: '',
      preferredEmail:'',
      dob: '',
      startDate: '',
      gender: '',
      dPosition:''
  },

},
  methods:{
    fetchMemberCertification() {
      fetch('api/memberCertification/')
      .then( response => response.json() )
      .then( json => {
        this.mcList = json;
        console.log(this.mcList);
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
          body: JSON.stringify(this.newMC),
          headers:{
            "Content-Type": "application/json; charset=utf-8"
          }
        })
        .then( response => response.json() )
        .then( json => {
          console.log("Returned from post:", json);
          this.mcList = json[0];
          this.newMC = this.newMCData();
      });
      console.log("Creating (POSTing)...!");
      console.log(this.newMC);
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

    editMember(){
      fetch('api/member/update.php', {
        method: 'POST',
        body: JSON.stringify(this.newMbr),
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        }
      })
      .then( response => response.json() )
      .then( json => {
        console.log("Returned from post:", json);
        this.mbrList = json;
        this.newMbr = this.newMbrData();
      });
      console.log("Creating (POSTing)...!");
      console.log(this.newMbr);
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
    newMbrData(){
      return {
        memberID:'',
        firstName:'',
        lastName:'',
        radioNumber:'',
        stationNumber:'',
        isActive:'',
        address:'',
        preferredEmail:'',
        dob:'',
        startDate:'',
        gender:'',
        dPosition:'',
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

    viewCertList(){
      this.certView="";
      this.certDetailView=false;
    },

    viewMbrList(){
      this.mbrView="";
      this.mbrDetailView=false;
    },

    addMemberCert(){

    },

  activeCert(){

  },
  activeMbr(){

  },


},

      created() {
        this.fetchmemberandcertification();

        // this.fetchMemberCertification();
      }
    });
