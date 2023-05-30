Feature: Login

  Rule: Happy paths
    Background:
      Given User go to login page
      When Enter "text" in "Tên đăng nhập" with "admin@admin.com"
      When Enter "text" in "Mật khẩu" with "Password1"
      When Click "Đăng nhập" button
      Then User look message "Thành công" popup
      When Click "Người Dùng" menu
      When Click "Tạo mới" sub menu to "/vn/user/add"
      
    Scenario: U-01 Verify that login successfully with valid Email and Password
      When Enter "text" in "Họ và tên" with "_RANDOM_"
      When Enter "email" in "Email" with "_RANDOM_"
      When Enter "text" in "Mật khẩu" with "Password1"
      When Enter "text" in "Nhập lại mật khẩu" with "Password1"
      When Enter "phone" in "Số điện thoại" with "_RANDOM_"
      When Enter date in "Ngày sinh"
      When Click select "Vị trí" with "Tester"
      When Enter date in "Ngày đầu đi làm"
      When Click select "Vai trò" with "Supper Admin"
      When Enter "words" in textarea "Mô tả" with "_RANDOM_"
      When Select file in "Tải ảnh lên" with "image.jpg"
      When Click "Lưu lại" button
      Then User look message "Tạo thành công" popup
      When Click "Huỷ bỏ" button
      When Click on the "Xóa" button in the "Email" table line

Rule: Bad paths
    Background:
      Given User go to login page
      When Enter "text" in "Tên đăng nhập" with "admin@admin.com"
      When Enter "text" in "Mật khẩu" with "Password1"
      When Click "Đăng nhập" button
      Then User look message "Thành công" popup
      When Click "Người Dùng" menu
      When Click "Tạo mới" sub menu to "/vn/user/add"

      Scenario: U-02 Verify that login unsuccessfully with valid Email and Password
      When Enter "text" in "Họ và tên" with "_RANDOM_"
      When Enter "email" in "Email" with "_RANDOM_"
      When Enter "text" in "Mật khẩu" with "Password1"
      When Enter "text" in "Nhập lại mật khẩu" with "Password1"
      When Enter "phone" in "Số điện thoại" with "0788888888845a"
      When Enter date in "Ngày sinh"
      When Click select "Vị trí" with "Tester"
      When Enter date in "Ngày đầu đi làm"
      When Click select "Vai trò" with "Supper Admin"
      When Enter "words" in textarea "Mô tả" with "_RANDOM_"
      When Select file in "Tải ảnh lên" with "image.jpg"
      When Click "Lưu lại" button
      Then Required message "Số điện thoại" displayed under "Số điện thoại không hợp lệ" field
      When Click "Huỷ bỏ" button

      Scenario: U-03 Verify that login unsuccessfully with valid Email and Password
      When Click "Người Dùng" menu
      When Enter "text" in "Họ và tên" with "_RANDOM_"
      When Enter "email" in "Email" with "_RANDOM_"
      When Enter "text" in "Mật khẩu" with "Password1"
      When Enter "text" in "Nhập lại mật khẩu" with "Password1"
      When Enter "phone" in "Số điện thoại" with "0788888888845a"
      When Enter date in "Ngày sinh"
      When Click select "Vị trí" with "Tester"
      When Enter date in "Ngày đầu đi làm"
      When Click select "Vai trò" with "Supper Admin"
      When Enter "words" in textarea "Mô tả" with "hahahahaah đồ điên"
      When Select file in "Tải ảnh lên" with "image.jpg"
      When Click "Lưu lại" button
      Then Required message "Số điện thoại" displayed under "Số điện thoại không hợp lệ" field
      When Click "Huỷ bỏ" button