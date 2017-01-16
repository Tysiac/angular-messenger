import {Injectable,Inject,OnInit,Injector} from "@angular/core";
import {Router,CanActivate} from '@angular/router';



import {RxFirebaseApp, RxFirebaseAuth, RxFirebaseView, EventType} from 'rxjsfirebase'

var config = config = {
    apiKey: "AIzaSyDt1uqu_mq_p4ePmnq74cAHIJs7QcjKsHE",
    authDomain: "tictactoe-9afee.firebaseapp.com",
    databaseURL: "https://tictactoe-9afee.firebaseio.com",
    storageBucket: "tictactoe-9afee.appspot.com",
    messagingSenderId: "913885610136"
}


@Injectable()
export class AuthService implements CanActivate, OnInit{
	
  router;
  
  public onLoginStatusChanged : (isLoggedIn)=>void = null;
  private firebase:RxFirebaseApp;


	constructor(@Inject(Injector) private injector:Injector)
  {
    this.firebase = new RxFirebaseApp(config);

    this.firebase.auth.rx_onAuthStateChanged().subscribe(authData => 
    {
        if (authData) 
        {
            console.log("User " + authData.uid + " is logged in with " + authData.providerData);

        } else 
        {
            console.log("User is logged out");
        }

         if(this.onLoginStatusChanged!=null)
        {
          this.onLoginStatusChanged(authData!=null);
        }
    })
	}

   ngOnInit()
   {
      
   }

  login(user: string, password: string): boolean {
      
         this.firebase.appReference.auth().signInWithEmailAndPassword(user, password).catch(function(error:Error) {
          // Handle Errors here.
          var errorCode = error.name;
          var errorMessage = error.message;
          // [START_EXCLUDE]
          if (errorCode === 'auth/wrong-password') {
            alert('Wrong password.');
          } else {
            alert(errorMessage);
          }
          console.log(error);
        });

      return true;
    
  }


  logout(): any 
  {
     this.firebase.appReference.auth().signOut();
     if(this.onLoginStatusChanged!=null)
      {
        this.onLoginStatusChanged(false);
      }
     
  }

  getUser(): any 
  {
      return this.firebase.appReference.auth().currentUser;
  }

  isLogged(): boolean 
  {
    var u=this.getUser();
    return  (u !== null && u !== "");
  }

   ngOnDestroy() 
   {
        this.logout();
   }

   public canActivate() 
   {

    if (this.isLogged()) 
    {
      return true;
    }

    let r: Router = this.injector.get(Router);
    r.navigate(['/login']);
    return false;
  }

}

/*
export var AUTH_PROVIDERS: Array<any> = [
  provide(AuthService, {useClass: AuthService})
];
*/
