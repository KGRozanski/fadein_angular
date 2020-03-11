import { Component, ViewChild, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { User } from '../../../../core/interfaces/user.interface';
import { UserDataService } from '../../../../core/services/userdata.service';
import { CropComponent } from '../../../../shared/tools/components/crop/crop.component';
import { trigger, state, style, animate, transition } from '@angular/animations';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
	selector: 'app-profile',
	templateUrl: './profile.component.html',
	styleUrls: ['./profile.component.scss'],
	animations: [
		trigger('toggle', [
			state('true', style({
				'height': '420px'
			})),
			state('false', style({
				'height': '0'
			})),
			transition('*=>true', animate('200ms')),
			transition('*=>false', animate('300ms'))
		])
	]
})
export class ProfileComponent implements OnInit {
	//User data object and image object
	private user: User;
	private imgData = {image: null};
	//Professions
	private professions: string[] = [];



	private isCropperShown = false;


	@ViewChild(CropComponent) crop;

	@ViewChild('newPhoto') newPhoto: ElementRef;

	ngOnInit() {
		console.log(this.user)
	}
	

	constructor(private us: UserDataService,    public snackBar: MatSnackBar) {
		this.us.USER_STATE.subscribe((data) => {
			this.user = data;
			this.imgData.image = data.avatar;
			this.professions = this.user['professions'];
		});

		
	}
	reciveImage($event) {
		this.imgData.image = $event;
		this.imgData = this.crop.data;
	}
	toggleCrop(isCanceled) {
		if (isCanceled == true) {
			this.us.USER_STATE.subscribe((data) => {
				this.imgData.image = data.avatar;
			});
		}
		this.isCropperShown = !this.isCropperShown;
	}





	//Photos
	private selectedPhoto: string;
	private galleryFlag: boolean = false;
	addPhoto() {
		this.newPhoto.nativeElement.click()
	}
	handleNewPhoto(files) {
		  const fd = new FormData();
		  fd.append('image', files['target']['files'][0]);
	  
		  let response: any;
	  
		  this.us.putPhoto(fd).subscribe({
			next: data => response = data,
			error: err => {
				this.snackBar.open('Error uploading an image!', 'Close', {
					duration: 3000
			  });
			},
			complete: () => {
				this.user.photos.push(response.body['imgUrl'])
				this.snackBar.open(response.body['msg'], 'Close', {
					duration: 3000
				});
			}
		})
	}
	selectPhoto(url) {
		this.selectedPhoto = this.us.APIurl + 'photo/' + this.user.username + '/' + url;
		this.galleryFlag = true;
	}
	photoGalleryClose($event) {
		this.galleryFlag = $event;
	}
}