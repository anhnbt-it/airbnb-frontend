import {Component, OnInit, ViewChild} from '@angular/core';
import {UserService} from '../../services/user.service';
import {RoomImages} from '../../models/roomImages';
import {RoomService} from '../../services/room.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {Room} from '../../models/room';
import {AuthService} from '../../services/auth.service';
import {DialogUpdateComponent} from '../booking-details/dialog-update/dialog-update.component';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-user-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user = {
    id: 0,
    name: '',
    email: '',
    gender: 0,
    dateOfBirth: null,
    phone: '',
    active: null,
    createdDate: null,
    updatedAt: null,
  };
  roomsOfHost = [];
  bookings = [];
  imagesRoom: RoomImages[] = [{
    imageUrl: ''
  }];
  pagingRooms;
  page = 0;
  size = 8;

  sortStatus = true;

  displayedColumns: string[] = ['id', 'roomName', 'createdDate', 'startDate', 'endDate', 'status', 'price', 'action'];
  dataSource;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private userService: UserService,
    private roomService: RoomService,
    public auth: AuthService,
  ) {
  }

  ngOnInit(): void {
    this.getData();
  }

  getData(): void {
    const userLocal = this.auth.getUserFromLocalStorage();
    this.userService.findById(userLocal.id).subscribe((res: any) => {
      this.user = res.data;
      this.userService.findRoomByUserId(this.user.id, this.page, this.size).subscribe((res: any) => {
        this.pagingRooms = res.data;
        this.roomsOfHost = res.data.content;
        if (this.roomsOfHost.length !== 0 && this.roomsOfHost[0].roomImages.length > 0) {
          console.log(this.roomsOfHost[0]);
          this.imagesRoom = this.roomsOfHost[0].roomImages;
        }
        this.userService.findBookingByUserId(this.user.id).subscribe((res: any) => {
          this.bookings = res.data;
          this.dataSource = new MatTableDataSource(this.bookings);
          this.dataSource.paginator = this.paginator;
        });
      });
    });
  }

  changeStatus(id: number): any {
    this.roomService.changeStatus(id).subscribe(res => {
      this.getData();
    });
  }

  sort(key: any): void {
    if (this.sortStatus) {
      this.bookings.sort((a, b) => (a[key] > b[key]) ? 1 : ((b[key] > a[key]) ? -1 : 0));
    } else {
      this.bookings.reverse();
    }
    this.dataSource = new MatTableDataSource(this.bookings);
    this.dataSource.paginator = this.paginator;
    this.sortStatus = !this.sortStatus;
  }


  edit(room: Room): void {
    const dialogRef = this.dialog.open(DialogUpdateComponent, {
      width: '450px',
      data: room
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getData();
      }
    });
  }
}
