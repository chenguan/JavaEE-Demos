Title: Linux系统学习笔记：文件 IO
Date: 2015-03-14 12:15:15
Category: Linux系统学习笔记  
Tags: Linux  
Slug: linux-file-io  

Linux系统中的文件IO主要用到5个函数：open、read、write、lseek、close。这些函数被称为不带缓冲的IO（unbuff IO），不带缓冲指的是每个read和write都调用内核中的一个系统调用。
***
## 1.文件描述符
在Linux下用文件描述符来表示设备文件和普通文件，所有对文件的操作都通过文件描述符实现。文件描述符是一个非负整数。  
按惯例，shell中为每个进程都关联了3个文件即： 
 
+ 标准输入      0   STDIN_FILENO 
+ 标准输出      1   STDOUT_FILENO
+ 标准错误输出    2   STDERR_FILENO
  
这三个符号常量定义在<unistd.h>中

## 2.标准IO函数  
### 2.1 open和creat 
使用open和creat打开或创建文件。  

```C
#include <fcntl.h>
int open(const char *path, int oflag,.../* mode_t mode */);
int creat(const char *path, mode_t mode);
/* 若操作成功，则返回文件描述符；若出错，返回-1 */
``` 
参数说明：  
path   
要打开或创建的文件的路径名（相对或者绝对路径）


oflag  
多个选项时用'|'隔开，这些常量定义在 <fcntl.h>中

* O_RDONLY
* O_WRONLY
* O_RDWR  
* O_EXEC 只执行打开
* O_SEARCH 只搜索打开
_以上5个选项必须有且只有一个。下列常量则是可选的_
* O_APPEND 每次谢都追加到文件尾
* O_CREAT 若此文件不存在则创建它，使用此选项是，open函数需同时说明第3个参数mode（访问权限），此时open函数功能和creat函数一样。
* O_DIRECTORY 如果path引用的不是目录，则出错。
* O_EXCL 如果同时指定了 O_CREAT，而文件已经存在，则出错。 文件不存在则创建文件，使测试和创建成为一个原子操作。
* O_NOCTTY 对于终端设备，不将该设备分配为此进程的控制终端。
* O_NOFOLLOW 若path引用的是一个符号链接，则出错。
* O_NONBLOCK 对于FIFO、块特殊文件、字符特殊文件，设为非阻塞模式。
* O_SYNC write 等待物理I/O操作完成，包括文件属性的更新。
* O_TRUNC 如果此文件存在，而且为只写或读-写成功打开，则将其长度截断为0。
* O_TTY_INIT 如果打开一个还未打开的终端设备，设置非标准 termios参数值，使其符合Single UNIX Specification。
* O_DSYNC  write 等待物理I/O操作完成，若写不影响读取（如文件大小没变化），不等待文件属性的更新
* O_RSYNC 与O_SYNC作用相同。

mode  
指定用户操作文件的权限，常用可选项：

* S_IRWXU 用户有读写和执行的权限
* S_IRUSR 用户对文件有读权限
* S_IWUSR 用户对文件有写权限
* S_IXUSR 用户对文件有执行权限
* ...  

### 2.2 close
```C
#include <unistd.h>
int close(int fd);
/* 成功返回0，出错返回-1*/
```
关闭文件时会释放该进程加在文件上的所有记录锁。进程终止时，内核会自动关闭它打开的文件。

### 2.3 lseek

每个打开文件都用一个与其相关联的“当前文件偏移量”，通常为一个非负整数，表示从文件开始的字节数。读/写操作从当前文件偏移量处开始，使偏移量增加读写的字节数。默认打开文件偏移量为0，以 O_APPEND 打开偏移量为文件的字节数。可以用 lseek 设置文件的偏移量。

```C
#include <unistd.h>
off_t lseek(int fd, off_t offset, int whence);
/*若成功，返回新的文件偏移量；若出错，返回为-1*/
```
offset
要增加的偏移量
whence
+ SEEK_SET，相对文件开始处
+ SEEK_CUR， 相对文件当前位置
+ SEEK_END， 相对文件结尾处

lseek 并不引起I/O操作，偏移量记录在内核中。
普通文件的偏移量必须是非负整数。偏移量可以大于文件的长度，这样之后的写会形成一个空洞，空洞不占存储，其中的字节被读为0。可以写一个这样的文件，用 od -c 命令验证一下，还可用 ls -ls 命令查看磁盘块占用情况。

### 2.4 read
```C
#include <unistd.h>
ssize_t read(int fd, void *buf, size_t count);
/*成功返回读到的字节数，已到文件尾返回0，出错返回-1 */*/
```
受文件大小、网络缓冲区、管道、FIFO的实际字节数的限制，实际读到的数据可能少于要读的字节数，信号中断也会造成这种情况。终端设备通常一次最多读一行，磁带等设备一次最多读一个记录。

### 2.5 write
```C
#include <unistd.h>
ssize_t write(int fd, const void *buf, size_t nbytes);
```
对于普通文件，在操作从文件的当前偏移量开始。若文件打开时指定了 O_APPEND 选项，则写之前将偏移量设置到文件结尾处。

## 3.文件共享
UNIX支持不同进程共享打开的文件。内核使用三种数据结构表示打开的文件：

进程在进程表中都有一个记录项，包含一张打开文件的描述符表。每个描述符占一项，包含描述符标志和指向一个文件表项的指针。
* 内核维持一张所有打开文件的文件表，每个文件表项包含文件状态标志、当前文件偏移量、指向文件v节点表项的指针。
* 每个打开文件有一个v节点表，每个v节点包含文件类型、操作函数指针和文件的i节点等。
* Linux将v节点和i节点实现为独立于文件系统的i节点和依赖文件系统的i节点。

![](http://7xi2wq.com1.z0.glb.clouddn.com/linux_Kernel_data_structures_for_open_files.png)
——打开文件的内核数据结构

![](http://7xi2wq.com1.z0.glb.clouddn.com/linux_Two_independent_processes_with_the_same_file_open.png)
——两个独立进程各自打开同一个文件

不同进程共享文件时，每个进程都有一个该文件的文件表项，指向同一个v节点表。多个文件描述符也可能指向同一个文件表项，如使用 dup 函数和 fork 后的父子进程。

## 4.原子操作
原子操作指有多步组成的操作，执行时要么全部执行，要么一步也不执行。
多个进程共享同一个文件，可能造成进程对文件的连续的操作被打乱，这就需要使操作成为原子操作。如 O_APPEND 将到尾端和写入数据组成原子操作，还有 O_CREAT 和 O_EXCL 将检查文件是否存在和创建文件组成原子操作。
### 4.1 pread和pwrite
```C
#include <unistd.h>
ssize_t pread(int fd, void *buf, size_t nbytes, off_t offset);
/* 成功返回读到的字节数，已到文件尾返回0，出错返回-1 */
ssize_t pwrite(int fd, const void *buf, size_t nbytes, off_t offset);
/* 成功返回写入的字节数，出错返回-1 */
```
调用pread相当于调用lseek后调用read（原子操作）：
+ 调用pread时，无法中断其定位和读操作
+ 不更新当前文件偏移量  

pwrite类似

### 4.2 dup和dup2
dup和dup2函数用来复制现有的文件描述符
```C
#include <unistd.h>
int dup(int fd);
int dup2(int fd, int fd2);
```
dup返回的新文件描述符一定是当前可用文件描述符中的最小数值。
dup2,可以用fd2参数指定新描述符的值。如果fd2已经打开，则先将其关闭。若fd等于fd2，则dup2返回fd2，而不关闭它。否则，fd2的FD_CLOEXEC文件描述符标志就被清除，这样fd2在进程调用exec时是打开状态。

![](http://7xi2wq.com1.z0.glb.clouddn.com/linux_Kernel_data_structures_after_dup_1.png.png )
——dup(1)后的内核数据结构

### 2.3 sync、fsync和fdatasync
向文件写入数据时，数据并不马上写入磁盘，内核通常先将数据复制到缓冲区，称为延迟写。
```C
#include <unistd.h>
int fsync(int fd);
int fdatasync(int fd);
   /* 成功返回0，出错返回-1 */
void sync(void);
```
sync 只是将所有修改过的块缓冲区排入写队列。通常，系统的update守护进程会周期调用sync函数，flush内核的块缓冲区。
fsync 对指定文件刷新块缓冲区，等待写磁盘结束，更新文件属性
fdatasync 对指定文件刷新块缓冲区，等待写磁盘结束，不更新文件属性
### 2.4 fcntl
fcntl函数可以改变已经打开文件的属性
```C
#include <fcntl.h>
int fcntl(int fd, int cmd, .../* int arg */);
    /*  成功依赖于cmd，出错返回-1 */
```
