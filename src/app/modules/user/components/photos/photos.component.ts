import {
	Component,
	OnInit,
	ViewChild,
	ElementRef,
	Input,
	Output,
	EventEmitter
} from '@angular/core';
import { UserDataService } from 'src/app/core/services/userdata.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from 'src/app/core/interfaces/user.interface';


@Component({
	selector: 'app-photos',
	templateUrl: './photos.component.html',
	styleUrls: ['./photos.component.scss']
})
export class PhotosComponent implements OnInit {
	private selectedPhoto: string;
	private galleryFlag: boolean = false;

	@ViewChild('newPhoto') newPhoto: ElementRef;
	@Input('user') user: User;
	@Output() photoAddEvent = new EventEmitter<string>();

	constructor(private us: UserDataService, public snackBar: MatSnackBar) {}

	ngOnInit() {}


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
				this.photoAddEvent.emit(response.body['imgUrl']);
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