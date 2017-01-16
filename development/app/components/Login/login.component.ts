
import {Component, ViewEncapsulation, ElementRef,Inject} from '@angular/core';

import {AuthService} from '../../services/AuthService/AuthService';
import {Router} from '@angular/router';

@Component({
    selector: 'login',
    encapsulation: ViewEncapsulation.None,
     providers: [],
    templateUrl:'login.html',
    //styles:[require('./login.css').toString()]
})



export class LoginComponent 
{
    private authService:AuthService;
    private router:Router;

    constructor(@Inject(AuthService) authService,@Inject(Router) router,@Inject(ElementRef) public elementRef)
    {
        this.authService=authService;
        this.router=router;
        
    }

    ngOnInit()
    {
        $('#login-form-link').click(function(e) {
        $("#login-form").delay(100).fadeIn(100);
        $("#register-form").fadeOut(100);
        $('#register-form-link').removeClass('active');
        $(this).addClass('active');
        e.preventDefault();
        });
        $('#register-form-link').click(function(e) {
            $("#register-form").delay(100).fadeIn(100);
             $("#login-form").fadeOut(100);
            $('#login-form-link').removeClass('active');
            $(this).addClass('active');
            e.preventDefault();
        });
    }
    
    public onLoginClick()
    {
        if(this.authService.login($("#username").val(),$("#password").val()))
        {
            this.router.navigate(['/home']);
        }
    }
    
}